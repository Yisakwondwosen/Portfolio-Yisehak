
import React from 'react';
import {
  Code,
  Users,
  Github,
  Linkedin,
  Twitter,
  Mail,
  Phone,
  Send,
  Heart,
  Briefcase,
  Layers,
  Globe
} from 'lucide-react';
import { Project, EventTalk, SocialLink } from './types';

export const PERSONAL_INFO = {
  name: "Yisehak Wondwossen",
  role: "Digital Architect | Founder of Ndoto IT Solutions",
  bio: `ADDIS ABABA — In the heart of Ethiopia’s burgeoning tech landscape, Yisehak Wondwossen is carving a path defined by imagination and technical rigor. What began as a formative spark in Asela—ignited by a gift of a first computer—has matured into a mission to solve societal challenges through high-fidelity software engineering.

Today, as the founder of Ndoto IT Solutions (derived from the Swahili word for 'Dream'), Wondwossen leads a bureau dedicated to custom digital experiences. His flagship endeavor, "Notify," serves as a vital bridge between educational institutions and parents, ensuring that the growth of the next generation is tracked with transparency and care. His philosophy remains simple: everything is possible once it is imagined.`,
};

export const PROJECTS: Project[] = [
  {
    id: "1",
    title: "Ndoto IT Solutions",
    description: "An independent creative bureau developing custom web and mobile experiences with a focus on local digital sovereignty.",
    icon: <Briefcase className="w-6 h-6" />,
  },
  {
    id: "2",
    title: "The Notify Platform",
    description: "A digital infrastructure project connecting thousands of parents and teachers to synchronize student progress.",
    icon: <Layers className="w-6 h-6" />,
  },
  {
    id: "3",
    title: "Startup Ecosystems",
    description: "Strategic advocacy for Ethiopian tech startups through mentorship and collaborative network building.",
    icon: <Globe className="w-6 h-6" />,
  }
];

export const EVENTS: EventTalk[] = [
  {
    id: "1",
    title: "UNDP Startup Boot Camp",
    image: "https://images.unsplash.com/photo-1540575861501-7cf05a4b125a?q=80&w=1000&auto=format&fit=crop",
    category: "Accelerator"
  },
  {
    id: "2",
    title: "JICA Digital Transformation",
    image: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=1000&auto=format&fit=crop",
    category: "Partnership"
  },
  {
    id: "3",
    title: "Kenyatta University DX",
    image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=1000&auto=format&fit=crop",
    category: "Talks"
  }
];

export const SOCIAL_LINKS: SocialLink[] = [
  { name: "LinkedIn", url: "https://linkedin.com", icon: <Linkedin className="w-5 h-5" /> },
  { name: "Github", url: "https://github.com", icon: <Github className="w-5 h-5" /> },
  { name: "Telegram", url: "https://t.me", icon: <Send className="w-5 h-5" /> },
  { name: "Twitter", url: "https://twitter.com", icon: <Twitter className="w-5 h-5" /> },
  { name: "Email", url: "mailto:yishak@dotoit.com", icon: <Mail className="w-5 h-5" /> },
];
