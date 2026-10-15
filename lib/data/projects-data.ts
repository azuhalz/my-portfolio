export type Project = {
  slug: string;
  title: string;
  shortDescription?: string;
  type: string;
  role: string;
  timeline: string;
  overview: string;
  techStack: string[];
  learnings: string[];
  image: string[];
  liveDemoLink?: string;
  githubLink?: string;
};

export const projectsData: Project[] = [
  {
    slug: "billo",
    title: "Billo",
    type: "Mobile App",
    role: "iOS Developer",
    timeline: "2025",
    overview:
      "Billo is a smart piggy bank and saving app that makes saving clear, fun, and rewarding for kids. They choose their goal, watch their progress grow, and earn little rewards along the way. The device reads every bit of money they add and updates the app right away. When the goal is reached, Billo opens and turns saving into a moment of pride.",
    techStack: [
      "SwiftUI",
      "Swift Data",
      "CoreBluetooth",
      "AVFoundation",
      "CoreGraphics",
      "PhotosUI",
      "Foundation",
      "Combine",
    ],
    learnings: [
      "Swift & SwiftUI development: building a native iOS application with declarative UI, reusable Views, navigation flows, interactive modals, and custom animations.",
      "MVVM architecture & state management: separating UI, business logic, and data models using ViewModels, ObservableObject, @Published, and dependency injection.",
      "Bluetooth Low Energy & IoT integration: discovering nearby peripherals, connecting to Bluetooth devices, discovering services and characteristics, and exchanging data through CoreBluetooth.",
      "Data persistence & savings logic: using SwiftData to store financial goals, savings progress, rewards, balances, and streaks, alongside UserDefaults for lightweight local preferences.",
      "Interactive features & unit testing: implementing goal validation, scheduled savings, streak tracking, reward claiming, and contextual chat messages, while writing tests for ViewModel behavior and validation scenarios.",
    ],
    image: [
      "/images/challenge7/ban1.jpeg",
      "/images/challenge7/ban2.jpeg",
      "/images/challenge7/ban3.jpeg",
      "/images/challenge7/ban4.jpeg",
      "/images/challenge7/ban5.jpeg",
    ],
    liveDemoLink: "https://youtu.be/HwJXb_lauAY",
    githubLink: "https://github.com/Final-Challenge-A06/Final-Challenge",
  },
  {
    slug: "fille",
    title: "Fillé",
    type: "Mobile App",
    role: "iOS Developer",
    timeline: "2025",
    overview:
      "Fillé is a hyper-casual fish-cutting simulator crafted to deliver deeply satisfying, ASMR-inspired gameplay. Slice fish with precision to fulfill customer orders, guided by immersive audio, haptic feedback, and dynamic animations. Each cut triggers a sense of urgency, flow, and reward — turning simple interactions into a captivating experience. Whether you're aiming for a perfect slice or just passing the time, Try Fillé and discover how something as simple as slicing fish can be so incredibly satisfying.",
    techStack: ["SwiftUI", "AVFoundation", "Core Haptics", "Swift Data"],
    learnings: [
      "Swift & SwiftUI fundamentals: building a native iOS game interface using Swift, SwiftUI Views, and declarative UI composition.",
      "Interactive gameplay & state management: managing game states, scores, countdown timers, fish positions, and cutting interactions using @State, @Binding, and @StateObject.",
      "Custom UI components & layout: separating gameplay elements into reusable SwiftUI Views, using GeometryReader and ZStack to position fish, cutting boards, and visual indicators.",
      "Animations & sensory feedback: creating fish-cutting animations, particle effects, visual score transitions, sound effects with AVFoundation, and haptic feedback for responsive gameplay.",
      "Data persistence & game logic: implementing high-score tracking with UserDefaults, storing player satisfaction data with SwiftData, and managing scoring and game progression.",
    ],
    image: ["/images/challenge5/banner2.png"],
    liveDemoLink: "https://youtu.be/BGy4RXHXQDA",
    githubLink: "https://github.com/Filleeeee/Fille",
  },
  {
    slug: "draw-and-match",
    title: "Draw and Match",
    type: "Mobile App",
    role: "iOS Developer",
    timeline: "2025",
    overview:
      "This iOS multiplayer game app features two mini games—Drawing Game and Memory Game—designed for real-time local play using Multipeer Connectivity. In the Drawing Game, players sketch a given word, and their drawings are scored using a custom ML model built with Create ML and processed through Core ML, with PencilKit enabling smooth in-app drawing. The Memory Game challenges players to match card pairs by remembering their positions. Developed by Ammar, Daffa, and Zuhal, the app blends creativity, memory, and fun into one seamless experience.",
    techStack: [
      "SwiftUI",
      "Create ML",
      "Core ML",
      "PencilKit",
      "Multipeer Connectivity",
    ],
    learnings: [
      "Real-time local multiplayer with Multipeer Connectivity: implementing peer-to-peer device discovery, session handling, and data syncing so two players can play both games together without internet, a new networking layer not touched in previous challenges.",
      "Card-matching game logic with animated state transitions: building the Memory Game fully in SwiftUI, using state-driven flip animations and transitions to reveal/hide cards and handle the find the matching pair logic.",
      "On-device machine learning training with Create ML: training a custom image-classification model from a hand-drawn dataset to recognize sketches (e.g. distinguishing a drawing of grapes from other objects).",
      "ML inference with Core ML: integrating the trained model into the app to run predictions in real time and score how closely a player's drawing matches the target word/dataset.",
      "Freehand drawing input with PencilKit: using PKCanvasView to capture smooth, natural sketch input from the user, which then gets converted into the image fed into the Core ML model for scoring.",
    ],
    image: ["/images/challenge4/banner.png"],
    liveDemoLink: "https://youtube.com/shorts/dxpuoyMNEXk",
  },
  {
    slug: "instacey",
    title: "Instacey",
    type: "Mobile App",
    role: "iOS Developer",
    timeline: "2025",
    overview:
      "Instacey is an iOS application designed to introduce my friend, Stacey Elbita Eliana, in a unique and engaging way. Inspired by the look and feel of an Instagram profile page, this app delivers a familiar and visually appealing experience for users to get to know Stacey better. From her profile picture and short bio to highlights and post grid, every element is crafted to resemble the interface of a widely loved social media platform. This app not only showcases Stacey's personal side but also serves as a platform to present her architectural portfolio. The portfolio page features her architectural design projects, each accompanied by a title and detailed explanation, allowing users to explore her professional journey and accomplishments. With a modern and intuitive design approach using SwiftUI, the app aims to present Stacey`s profile in an aesthetically pleasing and informative way, making it easy for users to navigate and appreciate both her personal and professional achievements.",
    techStack: ["SwiftUI"],
    learnings: [
      "Swift fundamentals: learning Swift syntax, data types, structs, properties, and arrays to build the foundation of iOS development.",
      "SwiftUI fundamentals: building interfaces with View structs, composing layouts using VStack, HStack, ZStack, and ScrollView, and styling elements with view modifiers.",
      "Data modeling & data-driven UI: defining struct models, organizing sample data into separate files, and displaying collections using ForEach.",
      "State management & navigation: using @State to manage interactive UI state, NavigationStack for screen navigation, and TabView to create swipeable image carousels.",
      "Component-based architecture: breaking screens into smaller, reusable SwiftUI Views and composing them in ContentView for cleaner, more maintainable code.",
    ],
    image: ["/images/challenge3/banner1.png", "/images/challenge3/banner2.png"],
    liveDemoLink: "https://youtube.com/shorts/veEnLLR0hl0",
    githubLink: "https://github.com/azuhalz/InStacey",
  },
];

// ===== Form CMS (Add/Edit Project) =====

export const MAX_GALLERY_IMAGES = 5;

export const projectTypeOptions = [
  "Web App",
  "Mobile App",
  "Desktop App",
  "Game",
  "Other",
];

export const projectRoleOptions = [
  "Frontend Developer",
  "Backend Developer",
  "Fullstack Developer",
  "iOS Developer",
  "Android Developer",
  "UI/UX Designer",
];

export type ProjectFormData = {
  title: string;
  shortDescription: string;
  techStack: string[];
  liveDemoLink: string;
  githubLink: string;
  type: string;
  role: string;
  timeline: string;
  overview: string;
  learnings: string[];
  coverImage: string;
  galleryImages: string[]; // selalu MAX_GALLERY_IMAGES slot, "" = kosong
};

export const initialProjectFormData: ProjectFormData = {
  title: "",
  shortDescription: "",
  techStack: [],
  liveDemoLink: "",
  githubLink: "",
  type: projectTypeOptions[0],
  role: projectRoleOptions[0],
  timeline: String(new Date().getFullYear()),
  overview: "",
  learnings: ["", "", ""],
  coverImage: "",
  galleryImages: Array.from({ length: MAX_GALLERY_IMAGES }, () => ""),
};
