package service

import (
	"bytes"
	"context"
	"errors"
	"fmt"
	"net/http"
	"strings"

	"github.com/azuhalz/my-portfolio/go-backend/internal/model"
	"github.com/jackc/pgx/v5"
)

const MaxProjectImageSize = 5 * 1024 * 1024 // 5 MB

var ErrInvalidProjectImage = errors.New("invalid project image")

type ProjectImageRepository interface {
	Create(
		ctx context.Context,
		projectID int16,
		imageData []byte,
		mimeType string,
		fileName *string,
		sortOrder int16,
	) (model.ProjectImage, error)

	GetByID(
		ctx context.Context,
		projectID int16,
		imageID int16,
	) (model.ProjectImage, error)

	Delete(
		ctx context.Context,
		projectID int16,
		imageID int16,
	) error
}

type ProjectImageService struct {
	projectRepository ProjectRepository
	imageRepository   ProjectImageRepository
}

func NewProjectImageService(
	projectRepository ProjectRepository,
	imageRepository ProjectImageRepository,
) *ProjectImageService {
	return &ProjectImageService{
		projectRepository: projectRepository,
		imageRepository:   imageRepository,
	}
}

func (s *ProjectImageService) Upload(
	ctx context.Context,
	slug string,
	imageData []byte,
	fileName string,
	sortOrder int16,
) (model.ProjectImage, error) {
	if len(imageData) == 0 || len(imageData) > MaxProjectImageSize {
		return model.ProjectImage{}, ErrInvalidProjectImage
	}

	mimeType := detectProjectImageMimeType(imageData)
	if mimeType == "" {
		return model.ProjectImage{}, ErrInvalidProjectImage
	}

	project, err := s.projectRepository.GetBySlug(ctx, slug)
	if err != nil {
		return model.ProjectImage{}, err
	}

	fileName = strings.TrimSpace(fileName)

	var savedFileName *string
	if fileName != "" {
		savedFileName = &fileName
	}

	image, err := s.imageRepository.Create(
		ctx,
		project.ID,
		imageData,
		mimeType,
		savedFileName,
		sortOrder,
	)
	if err != nil {
		return model.ProjectImage{}, err
	}

	image.ImageURL = fmt.Sprintf(
		"/api/projects/%s/images/%d",
		project.Slug,
		image.ID,
	)

	return image, nil
}

func (s *ProjectImageService) GetByID(
	ctx context.Context,
	slug string,
	imageID int16,
) (model.ProjectImage, error) {
	project, err := s.projectRepository.GetBySlug(ctx, slug)
	if err != nil {
		return model.ProjectImage{}, err
	}

	image, err := s.imageRepository.GetByID(
		ctx,
		project.ID,
		imageID,
	)
	if err != nil {
		if errors.Is(err, pgx.ErrNoRows) {
			return model.ProjectImage{}, pgx.ErrNoRows
		}

		return model.ProjectImage{}, err
	}

	return image, nil
}

func (s *ProjectImageService) Delete(
	ctx context.Context,
	slug string,
	imageID int16,
) error {
	project, err := s.projectRepository.GetBySlug(ctx, slug)
	if err != nil {
		return err
	}

	return s.imageRepository.Delete(
		ctx,
		project.ID,
		imageID,
	)
}

func detectProjectImageMimeType(data []byte) string {
	detectedType := http.DetectContentType(data)

	switch detectedType {
	case "image/jpeg", "image/png":
		return detectedType
	}

	// WebP signature: RIFF....WEBP
	if len(data) >= 12 &&
		bytes.Equal(data[0:4], []byte("RIFF")) &&
		bytes.Equal(data[8:12], []byte("WEBP")) {
		return "image/webp"
	}

	return ""
}
