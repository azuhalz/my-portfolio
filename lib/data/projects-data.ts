export type Project = {
  slug: string;
  title: string;
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
      "MVVM architecture: separating business logic into dedicated ViewModel classes (ObservableObject + @Published), marked with @MainActor for thread-safe UI updates, and coordinating app-wide navigation state through a central AppFlowViewModel (an enum screen state).",
      "Bluetooth Low Energy (BLE) integration: implementing CoreBluetooth's CBCentralManagerDelegate / CBPeripheralDelegate protocols to scan, connect, and read/write characteristic data from an external device, then exposing the results to SwiftUI through closure-based callbacks.",
      "Advanced SwiftData querying: using FetchDescriptor with #Predicate to filter persisted records by condition (not just fetching everything), plus modeling relational-style data across multiple entities (GoalModel, SavingProgressEntity, RewardEntity).",
      "Automated unit testing: writing tests with Apple's modern Swift Testing framework (@Suite, @Test, #expect) covering both positive and negative cases for view model logic.",
      "Protocol-based dependency injection for testability: defining a protocol (e.g. GoalSaving) that the real ModelContext conforms to, then substituting a MockModelContext in tests — decoupling the view model from SwiftData so its logic can be verified without a real database.",
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
      "Manager architecture with ObservableObject: separating non-UI logic (audio, haptics, scoring) into standalone classes (AudioManager, HapticManager, ScoreManager) injected into views via @StateObject, including the singleton pattern (static shared).",
      "Data persistence with SwiftData: using @Model to create persistently stored models, .modelContainer(), @Query, and @Environment(\.modelContext) to insert/save data (scores that persist across sessions).",
      "Integrating low-level native frameworks: AVFoundation (AVAudioPlayer) for sound effects/music, and CoreHaptics/UIImpactFeedbackGenerator for haptic feedback, with proper do-catch error handling.",
      "Real-time game loop & timing: combining Timer.publish().autoconnect() with .onReceive() for the countdown, Timer.scheduledTimer for per-frame knife position updates, and DispatchQueue.main.asyncAfter to sequence multi-step animations.",
      "Custom Shape & manual particle effects: building custom shapes (Triangle, DashedLine) with Path, and creating a fish-cutting particle effect using trigonometry (cos/sin) for randomized motion instead of a ready-made animation library.",
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
      "SwiftUI fundamentals: View structs with body: some View, layout using VStack/HStack/ZStack/ScrollView, and chained styling modifiers (.resizable(), .clipShape(), .cornerRadius(), etc).",
      "State management & navigation: using @State for mutable data, NavigationStack/NavigationLink for screen transitions, and .sheet(item:) for modal detail views.",
      "Data modeling: creating struct models conforming to Identifiable, separating dummy data into its own files, and rendering it with ForEach.",
      "Interactive components: creating image carousel with TabView + .tabViewStyle(PageTabViewStyle()), photo grid with LazyVGrid, and light animations with withAnimation().",
      "Component-based architecture: breaking the UI into small, reusable Views (per section) and composing them back together in ContentView, following SwiftUI's declarative style.",
    ],
    image: ["/images/challenge3/banner1.png", "/images/challenge3/banner2.png"],
    liveDemoLink: "https://youtube.com/shorts/veEnLLR0hl0",
    githubLink: "https://github.com/azuhalz/InStacey",
  },
];
