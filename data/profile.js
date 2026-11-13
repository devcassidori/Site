/* Conteúdo do portfólio — edite aqui.
   Fontes: linkedin.com/in/lucascassidori · github.com/devcassidori · devcassidori.github.io/MeuSite (nov/2026) */
window.PROFILE = {
  name: "Lucas Cassidori",
  role: "Dev Full Stack",
  headline:
    "Engenheiro de Computação e desenvolvedor full stack — C#/.NET, React, TypeScript, Python e IA generativa, do requisito ao deploy em cloud.",
  location: "São Paulo, SP",

  links: {
    linkedin: "https://www.linkedin.com/in/lucascassidori/",
    github: "https://github.com/devcassidori",
    instagram: "https://www.instagram.com/lucassidori/",
    whatsapp: "https://wa.me/5511986773822",
    email: "devcassidori@gmail.com",
    cv: "https://devcassidori.github.io/MeuSite/assets/CV%20Lucas%20Cassidori.pdf",
    oldSite: "https://devcassidori.github.io/MeuSite/",
  },

  /* ---------------- SOBRE ---------------- */
  about: [
    "Sou Engenheiro de Computação com MBA em Engenharia de Software e pós-graduação em Engenharia de IA, e atuo em todo o ciclo de vida de aplicações: requisitos, arquitetura, implementação, testes, CI/CD e deploy em AWS e Azure.",
    "Minha base é C#/.NET, ASP.NET Core, Entity Framework, React, TypeScript e Next.js — somada a Python, IA generativa, LLMs, AI Agents, LangChain e OpenAI API. Aplico Clean Architecture, SOLID, DDD e Design Patterns para criar sistemas escaláveis, seguros e fáceis de manter.",
    "Acredito que tecnologia é feita por pessoas para pessoas: comunicação e trabalho em equipe fazem parte de como eu entrego.",
  ],
  offCode: [
    { icon: "🥋", title: "Jiu-jitsu", text: "Faixa azul pela equipe Alliance." },
    { icon: "🎮", title: "Videogame", text: "Jogador nas horas vagas — e criador de alguns jogos web." },
    { icon: "🃏", title: "Família", text: "Truco, uno e dominó nos fins de semana." },
  ],
  languages: [
    { name: "Português", level: "Nativo", pct: 100 },
    { name: "Inglês", level: "Intermediário · B2", pct: 70 },
  ],

  /* ---------------- EXPERIÊNCIA ---------------- */
  experience: [
    {
      period: "jun 2026 — hoje",
      title: "Desenvolvedor Full Stack",
      org: "Adar Tecidos",
      place: "São Paulo · Presencial",
      points: [
        "Sistemas e automações com foco em performance, escalabilidade e otimização de processos em C#, VB.NET, ASP.NET MVC, WebForms e Windows Forms.",
        "Front-ends em React, TypeScript, jQuery e Bootstrap com foco em UX e responsividade.",
        "SQL Server/T-SQL, APIs REST, DDD, Design Patterns e CI/CD com Azure DevOps, usando IA no fluxo de desenvolvimento.",
      ],
      tags: ["C#", "VB.NET", "ASP.NET MVC", "React", "SQL Server", "Azure DevOps"],
    },
    {
      period: "jan 2025 — fev 2026",
      title: "Engenheiro de Software",
      org: "MGE Broadcast",
      place: "São Paulo · Presencial",
      points: [
        "Software para sistemas embarcados, aplicações robóticas e web.",
        "Telemetria para monitoramento remoto de dispositivos em C, C++ e JavaScript.",
        "Sites institucionais e plataformas web interativas em React, junto com times de hardware e produto.",
      ],
      highlight: {
        title: "Projeto de Telemetria · SET Expo 2025",
        text: "Protótipo de telemetria web embarcada que integra transmissor RF com monitoramento em tempo real no browser, com SoMs ARM e interface web responsiva, apresentado no maior evento de broadcast da América Latina.",
      },
      tags: ["C", "C++", "JavaScript", "React", "Embarcados"],
    },
    {
      period: "jul 2023 — set 2023",
      title: "Desenvolvedor Full Stack",
      org: "Tata Consultancy Services",
      place: "Remoto",
      points: [
        "Aplicações web escaláveis com .NET, C#, ASP.NET, Java e Spring Boot.",
        "Interfaces em AngularJS, React e TypeScript; Entity Framework com SQL Server.",
        "Times ágeis com Scrum/Kanban, GitLab, GitHub e práticas de DevOps.",
      ],
      tags: [".NET", "Java", "Spring Boot", "Angular", "Entity Framework"],
    },
    {
      period: "jul 2022 — jul 2023",
      title: "Trainee Desenvolvedor",
      org: "Tata Consultancy Services",
      place: "Remoto",
      points: [
        "Ciclo completo de desenvolvimento (SDLC), da análise de requisitos à produção.",
        "Criação, manutenção e otimização de aplicações .NET com Git e integração contínua.",
      ],
      tags: [".NET", "C#", "Git", "Agile"],
    },
    {
      period: "abr 2022 — jul 2022",
      title: "Estagiário de Desenvolvimento",
      org: "Tata Consultancy Services",
      place: "Remoto",
      points: ["Componentes front-end responsivos em HTML5, CSS3 e JavaScript, correção de bugs e sprints ágeis."],
      tags: ["HTML", "CSS", "JavaScript"],
    },
    {
      period: "jan 2020 — abr 2022",
      title: "Motorista Parceiro",
      org: "Uber",
      place: "São Paulo",
      points: ["Mais de 2.000 clientes atendidos com média 5 estrelas, enquanto fazia a transição para tecnologia."],
      tags: ["Atendimento", "Resiliência"],
    },
    {
      period: "ago 2018 — dez 2019",
      title: "Jovem Aprendiz (ADM)",
      org: "Santa Casa de Misericórdia de São Paulo",
      place: "São Paulo",
      points: ["Gestão de arquivos de pacientes com confidencialidade e conformidade (LGPD) e apoio a agendamentos."],
      tags: ["Organização", "LGPD"],
    },
  ],

  /* ---------------- FORMAÇÃO (LinkedIn → Formação acadêmica) ---------------- */
  education: [
    {
      abbr: "IA",
      period: "out 2025 — out 2026",
      degree: "Pós-graduação Lato Sensu",
      title: "Engenharia de IA",
      org: "Impacta Tecnologia",
      points: [
        { h: "AI Engineering & Machine Learning", t: "Deep Learning, Reinforcement Learning, Machine Learning, Computer Vision e NLP aplicados a soluções inteligentes." },
        { h: "Generative AI & LLMs", t: "Modelos generativos de texto e imagem, LLMs, Prompt Engineering, engenharia de features e sistemas de recomendação." },
        { h: "MLOps & LLMOps", t: "Desenvolvimento, implantação, monitoramento e escalabilidade de soluções de IA." },
        { h: "AI + Software & Cloud", t: "IA integrada a software, Cloud Computing, arquitetura limpa, DevOps, containers e bancos vetoriais (Vector DB)." },
        { h: "Inovação & Data-Driven", t: "IA, Ciência de Dados e Engenharia de Software para transformar problemas complexos em soluções práticas e escaláveis." },
      ],
      tags: ["Deep Learning", "LLMs", "MLOps", "Computer Vision", "NLP", "Vector DB"],
    },
    {
      abbr: "MBA",
      period: "mai 2025 — set 2026",
      degree: "MBA",
      title: "Engenharia de Software",
      org: "Impacta Tecnologia",
      points: [
        { h: "Arquitetura de Software", t: "Design Patterns, SOLID, Clean Code e soluções escaláveis e robustas." },
        { h: "Desenvolvimento & APIs", t: "Java, Python, JavaScript, Go e C#, com APIs RESTful, integração de serviços e Microservices." },
        { h: "Cloud & DevOps", t: "AWS, Azure, Docker, Kubernetes, CI/CD, DevOps e DevSecOps." },
        { h: "Qualidade & Agilidade", t: "Scrum, Kanban, Lean, XP, TDD e testes automatizados." },
        { h: "Liderança Técnica", t: "Gestão de projetos e decisões arquiteturais com foco em inovação, segurança e performance." },
      ],
      tags: ["Arquitetura", "Microservices", "Kubernetes", "DevSecOps", "TDD"],
    },
    {
      abbr: "MBA",
      period: "nov 2025 — set 2026",
      degree: "MBA",
      title: "Inovação Digital",
      org: "Anhanguera Educacional",
      points: [
        { h: "Tecnologia & IA", t: "Tecnologias e soluções em TI, Inteligência Artificial e Machine Learning aplicadas à inovação." },
        { h: "Dados & Cloud", t: "Business Intelligence, Big Data e Cloud Computing para apoiar a tomada de decisão." },
        { h: "Gestão Ágil", t: "Gestão ágil de projetos, planejamento e colaboração em equipes multidisciplinares." },
        { h: "Ecossistemas de Inovação", t: "Gestão da inovação, transformação digital e novas tecnologias." },
        { h: "Processos & Digitalização", t: "Reengenharia de processos, automação e melhoria contínua." },
      ],
      tags: ["BI", "Big Data", "Cloud", "Inovação", "Gestão Ágil"],
    },
    {
      abbr: "ROB",
      period: "jan 2025 — nov 2025",
      degree: "Pós-graduação Lato Sensu",
      title: "Engenharia Robótica",
      org: "Anhanguera Educacional",
      points: [
        { h: "Automação & Robótica", t: "Automação industrial, sistemas de controle, robótica e lógica programável." },
        { h: "Sistemas Embarcados", t: "C, Assembly, microcontroladores, integração hardware/software e sistemas digitais." },
        { h: "IA & Machine Learning", t: "ML e IA aplicados a automação, controle e otimização de processos industriais." },
        { h: "Ciber-Físicos & Indústria 4.0", t: "Manufatura inteligente, sistemas ciber-físicos e transformação digital." },
        { h: "Engenharia & Segurança", t: "Sistemas elétricos, materiais tecnológicos e proteção de sistemas." },
      ],
      tags: ["Arduino", "IoT", "Embarcados", "Indústria 4.0"],
    },
    {
      abbr: "ENG",
      period: "ago 2017 — dez 2024",
      degree: "Bacharelado em Engenharia",
      title: "Engenharia de Computação",
      org: "Universidade São Judas Tadeu",
      points: [
        { h: "Programação & Desenvolvimento", t: "C, Python, Java, desenvolvimento e modelagem de sistemas complexos." },
        { h: "IA & Dados", t: "Análise de dados, Machine Learning, IA, modelagem matemática e simulação." },
        { h: "Embarcados & IoT", t: "Microcontroladores Arduino, ARM e PIC em projetos de automação." },
        { h: "Engenharia & Tecnologia", t: "Eletrônica digital, física aplicada, materiais e sistemas digitais." },
        { h: "Gestão & Inovação", t: "Gestão de projetos, operações e qualidade." },
      ],
      tags: ["C", "Python", "Java", "ML", "Arduino", "ARM"],
    },
  ],

  /* ---------------- CERTIFICADOS (LinkedIn → Licenças e certificados) ---------------- */
  certificates: [
    {
      title: "AI Professional",
      org: "Google",
      issued: "mai 2026",
      code: "1USW254H8DPL",
      url: "https://www.credly.com/badges/d5245fe1-3d7a-48fb-bb1d-e8b4876e4a3d",
      skills: ["Inteligência Artificial"],
    },
    {
      title: "Oracle Cloud Infrastructure AI Foundations",
      org: "Oracle",
      issued: "out 2025",
      expires: "out 2027",
      url: "https://catalog-education.oracle.com/ords/certview/sharebadge?id=F94BC1826007328E2CD01B4FB128CF66AE1EB9C1F46F76022CA8154A0ADD2F17",
      skills: ["OCI", "IA", "Cloud"],
    },
    {
      title: "Scrum Foundation",
      org: "Certiprof",
      issued: "jan 2025",
      url: "https://www.credly.com/badges/7277ecba-a1e6-4ddb-b2cf-60fc5cf8c40a/public_url",
      skills: ["Scrum", "Metodologias Agile"],
    },
    {
      title: "Prompt Engineering",
      org: "Certiprof",
      issued: "jan 2025",
      url: "https://www.credly.com/badges/f99af1cf-d512-459e-82d7-c343c6802214",
      skills: ["Inteligência Artificial"],
    },
    {
      title: "Lifelong Learning",
      org: "Certiprof",
      issued: "jul 2022",
      url: "https://www.credly.com/badges/41390cc8-ab26-421e-8868-ed7d99e580a9",
      skills: ["Aprendizado contínuo"],
    },
  ],

  /* ---------------- SKILLS (README do GitHub) ---------------- */
  skillGroups: [
    { name: "Linguagens", icon: "⌘", items: ["C#", "VB.NET", "JavaScript", "TypeScript", "Python", "Java", "C", "C++"] },
    { name: "Front-end", icon: "◧", items: ["React", "Next.js", "Angular", "HTML5", "CSS3", "Tailwind CSS", "Bootstrap", "jQuery"] },
    { name: "Back-end", icon: "⬡", items: [".NET", "ASP.NET Core", "ASP.NET MVC", "Entity Framework", "Node.js", "Spring Boot", "REST APIs"] },
    { name: "Bancos de dados", icon: "◫", items: ["SQL Server", "PostgreSQL", "MySQL", "MongoDB", "SQLite", "Supabase"] },
    { name: "Cloud & DevOps", icon: "▲", items: ["Azure", "AWS", "Docker", "Kubernetes", "Azure DevOps", "Git", "GitHub", "GitLab", "CI/CD"] },
    { name: "IA & Automação", icon: "◎", items: ["OpenAI", "Anthropic", "Gemini", "LangChain", "AI Agents", "MCP", "n8n", "GitHub Copilot", "Lovable"] },
    { name: "Arquitetura", icon: "◇", items: ["Clean Architecture", "Clean Code", "SOLID", "DDD", "MVC", "Microservices", "TDD", "DevSecOps"] },
    { name: "Ferramentas", icon: "✦", items: ["Postman", "Figma", "UML", "Arduino", "GIMP", "Inkscape", "Scrum", "Kanban"] },
  ],
  sphereSkills: [
    "C#", ".NET", "React", "TypeScript", "Next.js", "Python", "Java", "Node.js",
    "SQL Server", "PostgreSQL", "MongoDB", "Docker", "Kubernetes", "Azure", "AWS",
    "LangChain", "OpenAI", "AI Agents", "MCP", "n8n", "Clean Arch", "DDD", "SOLID", "Git",
  ],
};
