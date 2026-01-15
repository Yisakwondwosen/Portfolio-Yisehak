
export interface Project {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}

export interface EventTalk {
  id: string;
  title: string;
  image: string;
  category: string;
}

export interface SocialLink {
  name: string;
  url: string;
  icon: React.ReactNode;
}
