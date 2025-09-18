'use client';

import Head from 'next/head';
import Script from 'next/script';
import { useEffect } from 'react';

const SobrePage = () => {

    useEffect(() => {
        // --- Lógica para o tema (claro/escuro) ---
        const themeToggleBtn = document.getElementById('theme-toggle-btn');
        const body = document.body;
        const themeIcon = themeToggleBtn?.querySelector('i');

        const applyTheme = (theme: string) => {
            body.classList.toggle('dark-theme', theme === 'dark');
            if (themeIcon) {
                themeIcon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
            }
            localStorage.setItem('theme', theme);
        };

        const savedTheme = localStorage.getItem('theme') || 'dark';
        applyTheme(savedTheme);

        const handleThemeClick = () => {
            const newTheme = body.classList.contains('dark-theme') ? 'light' : 'dark';
            applyTheme(newTheme);
        };
        themeToggleBtn?.addEventListener('click', handleThemeClick);

        // --- Lógica para o efeito de digitação ---
        const typingData = [
            { line: '<span class="keyword">const</span> developer = {', delay: 2 },
            { line: '  nome: <span class="string">"Lucas Manoel"</span>,', delay: 2 },
            { line: '  idade: <span class="number">20</span>,', delay: 2 },
            { line: '  curso: <span class="string">"Eng. Software"</span>,', delay: 2 },
            { line: '  foco: <span class="string">"Backend ❤"</span>,', delay: 2 },
            { line: '  objetivo: <span class="string">"Primeiro Estágio"</span>', delay: 2 },
            { line: '};', delay: 2 },
            { line: '', delay: 2 },
            { line: '<span class="comment">// Sempre aprendendo 🚀</span>', delay: 2 }
        ];
        const typingElement = document.getElementById('typing-effect');
        let currentLine = 0;
        let isTypingStarted = false;

        function typeLine() {
            if (!typingElement || currentLine >= typingData.length) return;
            const lineDiv = document.createElement('div');
            typingElement.appendChild(lineDiv);
            const { line, delay } = typingData[currentLine];
            let charIndex = 0;
            function typeChar() {
                if (charIndex < line.length) {
                    lineDiv.innerHTML = line.substring(0, charIndex + 1);
                    charIndex++;
                    setTimeout(typeChar, 20 + Math.random() * 30);
                } else {
                    currentLine++;
                    setTimeout(typeLine, delay);
                }
            }
            typeChar();
        }

        const heroObserver = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting && !isTypingStarted) {
                isTypingStarted = true;
                setTimeout(typeLine, 500);
                heroObserver.disconnect();
            }
        }, { threshold: 0.1 });

        const heroElement = document.querySelector('.hero');
        if (heroElement) {
            heroObserver.observe(heroElement);
        }

        // --- Lógica para animação de scroll (fade-in) ---
        const scrollObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                } else {
                    entry.target.classList.remove('visible');
                }
            });
        }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

        document.querySelectorAll('.fade-in').forEach(el => scrollObserver.observe(el));

        // --- Lógica para o menu de navegação e scroll suave ---
        const handleScroll = () => {
            document.querySelector('header')?.classList.toggle('scrolled', window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);

        const smoothScrollHandler = (e: Event) => {
            e.preventDefault();
            const anchor = e.currentTarget as HTMLAnchorElement;
            const targetId = anchor.getAttribute('href');
            const target = targetId ? document.querySelector(targetId) : null;
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        };
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', smoothScrollHandler);
        });

        return () => {
            window.removeEventListener('scroll', handleScroll);
            themeToggleBtn?.removeEventListener('click', handleThemeClick);
            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.removeEventListener('click', smoothScrollHandler);
            });
        };
    }, []);

    return (
        <>
            <Head>
                <title>Lucas Manoel - Desenvolvedor Backend</title>
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            </Head>
            
            <style jsx global>{`
                /* ===== AJUSTE DE ALINHAMENTO DOS CARDS ===== */
                .article-card {
                    display: flex; /* Adicionado */
                    flex-direction: column; /* Adicionado */
                }
                .article-content {
                    flex-grow: 1; /* Adicionado para fazer o conteúdo crescer e ocupar o espaço */
                }
                
                /*
                * NOTA: O CSS do loader foi removido daqui e deve estar no loading.tsx,
                * a não ser que você queira que ele fique global.
                */

                :root {
                    --bg-primary: #FEFEFE;
                    --bg-secondary: #FAF7F0;
                    --text-primary: #2C1810;
                    --text-secondary: #6B4423;
                    --accent-primary: #8B4513;
                    --accent-secondary: #A0522D;
                    --highlight: #D2B48C;
                    --border-color: #EAE2D7;
                    --shadow-color: rgba(139, 69, 19, 0.1);
                }
                body.dark-theme {
                    --bg-primary: #1c1814;
                    --bg-secondary: #2C241E;
                    --text-primary: #FAF7F0;
                    --text-secondary: #A89F91;
                    --accent-primary: #D2B48C;
                    --accent-secondary: #A0522D;
                    --highlight: #8B4513;
                    --border-color: #443B32;
                    --shadow-color: rgba(0, 0, 0, 0.2);
                }
                * { margin: 0; padding: 0; box-sizing: border-box; }
                html { scroll-behavior: smooth; }
                body {
                    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                    line-height: 1.7;
                    background: var(--bg-primary);
                    color: var(--text-primary);
                    overflow-x: hidden;
                    transition: background-color 0.4s ease, color 0.4s ease;
                }
                .container { max-width: 1200px; margin: 0 auto; padding: 0 2rem; }
                section { padding: 6rem 0; transition: background-color 0.4s ease; }
                section:nth-of-type(odd):not(.hero) { background-color: var(--bg-secondary); }
                .fade-in {
                    opacity: 0;
                    transform: translateY(40px);
                    transition: opacity 0.8s ease-out, transform 0.8s ease-out;
                }
                .fade-in.visible { opacity: 1; transform: translateY(0); }
                header {
                    position: fixed; top: 0; left: 0; right: 0;
                    background: rgba(254, 254, 254, 0.9);
                    backdrop-filter: blur(10px); z-index: 1000;
                    padding: 1rem 0;
                    transition: all 0.3s ease;
                    border-bottom: 1px solid transparent;
                }
                body.dark-theme header {
                        background: rgba(28, 24, 20, 0.85);
                }
                header.scrolled {
                    box-shadow: 0 2px 20px var(--shadow-color);
                    border-bottom: 1px solid var(--border-color);
                }
                nav { display: flex; justify-content: space-between; align-items: center; }
                .logo { font-size: 1.5rem; font-weight: 700; color: var(--accent-primary); }
                .nav-links { display: flex; list-style: none; gap: 2rem; align-items: center; }
                .nav-links a { text-decoration: none; color: var(--text-primary); font-weight: 500; transition: color 0.3s ease; }
                .nav-links a:hover { color: var(--accent-primary); }
                #theme-toggle-btn {
                    background: none; border: none; cursor: pointer;
                    font-size: 1.2rem; color: var(--text-secondary);
                    transition: color 0.3s ease, transform 0.3s ease;
                    padding: 0.5rem;
                }
                #theme-toggle-btn:hover { color: var(--accent-primary); transform: scale(1.1); }
                .login-btn {
                    background: var(--accent-primary); color: var(--bg-primary);
                    padding: 0.7rem 1.5rem; border-radius: 8px;
                    text-decoration: none; font-weight: 600;
                    transition: all 0.3s ease; display: flex; align-items: center; gap: 0.5rem;
                }
                .login-btn:hover { background: var(--accent-secondary); transform: translateY(-2px); }
                .hero { min-height: 100vh; display: flex; align-items: center; background: linear-gradient(135deg, var(--bg-secondary) 0%, var(--bg-primary) 100%); position: relative; overflow: hidden; padding-top: 5rem; }
                .hero-content { display: grid; grid-template-columns: 1.1fr 1fr; gap: 4rem; align-items: center; position: relative; z-index: 1; }
                .hero-title { font-size: 3.5rem; font-weight: 800; margin-bottom: 1rem; line-height: 1.2; color: var(--text-primary); }
                .hero-subtitle { font-size: 1.3rem; color: var(--text-secondary); margin-bottom: 2rem; }
                .hero-description { font-size: 1.1rem; color: var(--text-secondary); margin-bottom: 2.5rem; }
                .social-links { display: flex; gap: 1rem; }
                .social-link {
                    width: 50px; height: 50px; background: var(--bg-primary);
                    border-radius: 12px; display: flex; align-items: center; justify-content: center;
                    color: var(--accent-primary); font-size: 1.2rem; text-decoration: none;
                    box-shadow: 0 4px 15px var(--shadow-color); transition: all 0.3s ease;
                }
                .social-link:hover { transform: translateY(-3px); box-shadow: 0 8px 25px var(--shadow-color); background: var(--accent-primary); color: var(--bg-primary); }
                .code-window { background: #2D2D2D; border-radius: 12px; padding: 1.5rem; box-shadow: 0 20px 50px rgba(0,0,0,0.2); max-width: 450px; }
                .window-header { display: flex; gap: 0.5rem; margin-bottom: 1.5rem; }
                .window-dot { width: 12px; height: 12px; border-radius: 50%; }
                .dot-red { background: #FF5F57; } .dot-yellow { background: #FFBD2E; } .dot-green { background: #28CA42; }
                .code-content { color: #A8B2D1; font-family: 'Courier New', monospace; font-size: 0.95rem; line-height: 1.6; }
                .code-line { min-height: 22px; }
                .keyword { color: #C792EA; } .string { color: #C3E88D; } .number { color: #F78C6C; } .comment { color: #616161; }
                .section-title { font-size: 2.8rem; font-weight: 700; text-align: center; margin-bottom: 4rem; position: relative; }
                .section-title::after { content: ''; position: absolute; bottom: -15px; left: 50%; transform: translateX(-50%); width: 70px; height: 4px; background: var(--accent-primary); border-radius: 2px; }
                .stack-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 2rem; }
                .stack-category { background: var(--bg-primary); padding: 2rem; border-radius: 12px; border-left: 4px solid var(--accent-primary); transition: transform 0.3s ease, box-shadow 0.3s ease; box-shadow: 0 5px 15px var(--shadow-color); }
                .stack-category:hover { transform: translateY(-5px); box-shadow: 0 10px 25px var(--shadow-color); }
                .category-title { font-size: 1.3rem; margin-bottom: 1rem; color: var(--accent-primary); display: flex; align-items: center; gap: 0.75rem;}
                .tech-list { display: flex; flex-wrap: wrap; gap: 0.75rem; }
                .tech-tag { background: var(--bg-secondary); padding: 0.5rem 1rem; border-radius: 20px; font-size: 0.9rem; border: 1px solid var(--border-color); color: var(--text-secondary); }
                .project-card { background: var(--bg-primary); border-radius: 15px; padding: 3rem; margin-bottom: 3rem; box-shadow: 0 10px 30px var(--shadow-color); transition: all 0.3s ease; }
                .project-card:hover { transform: translateY(-8px); box-shadow: 0 20px 50px var(--shadow-color); }
                .project-title { font-size: 1.8rem; margin-bottom: 0.5rem; color: var(--text-primary); }
                .project-description { color: var(--text-secondary); margin-bottom: 2rem; font-size: 1.1rem; }
                .features-title { font-size: 1.2rem; font-weight: 600; margin-bottom: 1rem; color: var(--text-primary); }
                .features-list { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 1rem; margin-bottom: 2rem;}
                .feature-item { display: flex; align-items: center; gap: 0.75rem; color: var(--text-secondary); }
                .feature-item i { color: var(--accent-primary); font-size: 1.1rem; width: 20px; text-align: center; }
                .tech-stack { display: flex; flex-wrap: wrap; gap: 0.75rem; margin-top: 1rem; margin-bottom: 2.5rem; }
                .tech-item { background: var(--highlight); color: var(--text-dark, #2C1810); padding: 0.5rem 1.2rem; border-radius: 20px; font-size: 0.9rem; font-weight: 500; }
                .project-links { display: flex; gap: 1rem; flex-wrap: wrap; }
                .project-link { padding: 0.8rem 1.5rem; border-radius: 8px; text-decoration: none; font-weight: 600; transition: all 0.3s ease; display: inline-flex; align-items: center; gap: 0.5rem; }
                .link-primary { background: var(--accent-primary); color: var(--bg-primary); }
                .link-secondary { background: transparent; color: var(--accent-primary); border: 2px solid var(--accent-primary); }
                .project-link:hover { transform: translateY(-2px); }
                .link-primary:hover { background: var(--accent-secondary); }
                .link-secondary:hover { background: var(--accent-primary); color: var(--bg-primary); }
                .articles-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 2rem; }
                .article-card { background: var(--bg-primary); border-radius: 12px; overflow: hidden; box-shadow: 0 5px 20px var(--shadow-color); transition: all 0.3s ease; }
                .article-card:hover { transform: translateY(-5px); box-shadow: 0 15px 40px var(--shadow-color); }
                .article-content { padding: 2rem; }
                .article-title { font-size: 1.3rem; margin-bottom: 1rem; color: var(--text-primary); }
                .article-excerpt { color: var(--text-secondary); margin-bottom: 1.5rem; }
                .article-meta { display: flex; justify-content: space-between; font-size: 0.9rem; color: var(--text-secondary); }
                footer { background: var(--text-dark, #2C1810); color: #EAE2D7; padding: 4rem 2rem 3rem; text-align: center; transition: background-color 0.4s ease; }
                body.dark-theme footer { background: #110E0B; }
                .footer-social { display: flex; justify-content: center; gap: 1.5rem; margin-bottom: 2rem; }
                .footer-social a {color: var(--accent-primary); text-decoration: none; font-size: 2rem; transition: all 0.3s ease; }
                body.dark-theme .footer-social a { color: #A89F91; }
                .footer-social a:hover { color: var(--highlight); transform: translateY(-3px); }
                .footer-content p { color: #A89F91; }
                @media (max-width: 768px) {
                    .nav-links { gap: 1rem; }
                    .nav-links span { display: none; }
                    .hero-content { grid-template-columns: 1fr; text-align: center; gap: 3rem; }
                    .hero-title { font-size: 2.8rem; }
                    .hero-visual { order: -1; }
                    .social-links { justify-content: center; }
                    .code-window { max-width: 90%; margin: 0 auto; }
                    .section-title { font-size: 2.2rem; }
                }
            `}</style>

            <header>
                <nav className="container">
                    <div className="logo">Lucas Manoel</div>
                    <ul className="nav-links">
                        <li><a href="#home">Início</a></li>
                        <li><a href="#stack">Stack</a></li>
                        <li><a href="#projetos">Projetos</a></li>
                        <li><a href="#artigos">Artigos</a></li>
                        <li>
                            <button id="theme-toggle-btn" aria-label="Toggle dark mode">
                                <i className="fas fa-moon"></i>
                            </button>
                        </li>
                        <li><a href="/sign-in" className="login-btn"><i className="fas fa-sign-in-alt"></i> <span>Acessar</span></a></li>
                    </ul>
                </nav>
            </header>
            
            <main>
                <section className="hero" id="home">
                    <div className="container hero-content">
                        <div className="hero-text">
                            <h1 className="hero-title">Desenvolvedor Backend</h1>
                            <p className="hero-subtitle">Estudante de Engenharia de Software</p>
                            <p className="hero-description">Construindo soluções robustas e escaláveis com foco em arquitetura de sistemas. Apaixonado por criar código eficiente que resolve problemas reais, sempre em busca de aprender e aplicar as melhores práticas de desenvolvimento.</p>
                            <div className="social-links">
                                <a href="https://github.com/Luccas-Manoel"  target="_blank" className="social-link" title="GitHub"><i className="fab fa-github"></i></a>
                                <a href="https://br.linkedin.com/"   target="_blank"className="social-link" title="LinkedIn"><i className="fab fa-linkedin"></i></a>
                                <a href="https://x.com/Devlucaszz"   target="_blank"className="social-link" title="X (Twitter)"><i className="fab fa-x-twitter"></i></a>
                                <a href="https://www.instagram.com/zzlucca_/"  target="_blank" className="social-link" title="Instagram"><i className="fab fa-instagram"></i></a>
                            </div>
                        </div>
                        <div className="hero-visual">
                            <div className="code-window">
                                <div className="window-header">
                                    <div className="window-dot dot-red"></div><div className="window-dot dot-yellow"></div><div className="window-dot dot-green"></div>
                                </div>
                                <pre className="code-content"><div id="typing-effect"></div></pre>
                            </div>
                        </div>
                    </div>
                </section>

                <section id="stack">
                    <div className="container">
                        <h2 className="section-title fade-in">Tecnologias & Habilidades</h2>
                        <div className="stack-grid">
                            <div className="stack-category fade-in">
                                <h3 className="category-title"><i className="fas fa-server"></i> Backend</h3>
                                <div className="tech-list">
                                    <span className="tech-tag">Node.js</span><span className="tech-tag">Java</span><span className="tech-tag">PHP</span><span className="tech-tag">SQL</span><span className="tech-tag">PostgreSQL</span><span className="tech-tag">Prisma</span>
                                </div>
                            </div>
                            <div className="stack-category fade-in" style={{transitionDelay: '150ms'}}>
                                <h3 className="category-title"><i className="fas fa-code"></i> Frontend</h3>
                                <div className="tech-list">
                                    <span className="tech-tag">HTML</span><span className="tech-tag">CSS</span><span className="tech-tag">JavaScript</span><span className="tech-tag">React</span><span className="tech-tag">Next.js</span><span className="tech-tag">Tailwind CSS</span>
                                </div>
                            </div>
                            <div className="stack-category fade-in" style={{transitionDelay: '300ms'}}>
                                <h3 className="category-title"><i className="fas fa-tools"></i> DevOps & Ferramentas</h3>
                                <div className="tech-list">
                                    <span className="tech-tag">AWS</span><span className="tech-tag">Git</span><span className="tech-tag">BetterAuth</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section id="projetos">
                    <div className="container">
                        <h2 className="section-title fade-in">Projeto em Destaque</h2>
                        <div className="project-card fade-in">
                            <h3 className="project-title">Personal Workspace</h3>
                            <p className="project-description">Um workspace completo e personalizado que centraliza ferramentas essenciais do dia a dia, funcionando como um painel de controle pessoal com armazenamento em nuvem, entretenimento e mais, tudo em uma plataforma segura.</p>
                            <div className="features-list">
                                <div className="feature-item"><i className="fas fa-cloud"></i><span>Drive pessoal (Cloud Storage)</span></div>
                                <div className="feature-item"><i className="fas fa-sticky-note"></i><span>Sistema de notas (Notion privado)</span></div>
                                <div className="feature-item"><i className="fas fa-film"></i><span>Streaming pessoal (Netflix privado)</span></div>
                                <div className="feature-item"><i className="fas fa-newspaper"></i><span>Agregador de notícias</span></div>
                                <div className="feature-item"><i className="fas fa-cloud-sun"></i><span>Informações meteorológicas</span></div>
                                <div className="feature-item"><i className="fas fa-coins"></i><span>Cotações de moedas e crypto</span></div>
                            </div>
                            <h4 className="features-title">Stack Utilizada:</h4>
                            <div className="tech-stack">
                                <span className="tech-item">Next.js</span><span className="tech-item">Node.js</span><span className="tech-item">PostgreSQL</span><span className="tech-item">Prisma</span><span className="tech-item">BetterAuth</span><span className="tech-item">AWS</span>
                            </div>
                            <div className="project-links">
                                <a href="/sign-in" className="project-link link-primary"><i className="fas fa-external-link-alt"></i> Ver Projeto</a>
                                <a href="https://github.com/Luccas-Manoel/Lucas-Manoel" target="_blank" className="project-link link-secondary"><i className="fab fa-github"></i> Código no GitHub</a>
                            </div>
                        </div>
                    </div>
                </section>

                <section id="artigos">
                    <div className="container">
                        <h2 className="section-title fade-in">Artigos & Aprendizados</h2>
                        <div className="articles-grid">
                            <article className="article-card fade-in">
                                <div className="article-content">
                                    <h3 className="article-title">Primeira Experiência com Next.js</h3>
                                    <p className="article-excerpt">Minha jornada migrando de backend puro para fullstack com Next.js. Desafios, descobertas e lições.</p>
                                    <div className="article-meta"><span><i className="fas fa-calendar"></i> Em breve</span></div>
                                </div>
                            </article>
                            <article className="article-card fade-in" style={{transitionDelay: '160ms'}}>
                                <div className="article-content">
                                    <h3 className="article-title">BetterAuth vs Auth.js</h3>
                                    <p className="article-excerpt">Por que escolhi BetterAuth. Uma análise comparativa baseada na experiência real de desenvolvimento.</p>
                                    <div className="article-meta"><span><i className="fas fa-calendar"></i> Em breve</span></div>
                                </div>
                            </article>
                            <article className="article-card fade-in" style={{transitionDelay: '320ms'}}>
                                <div className="article-content">
                                    <h3 className="article-title">Deploy de Aplicações Next.js em VPS</h3>
                                    <p className="article-excerpt">Guia prático para configurar um ambiente de produção usando VPS e EasyPanel para deploy.</p>
                                    <div className="article-meta"><span><i className="fas fa-calendar"></i> Em breve</span></div>
                                </div>
                            </article>
                        </div>
                    </div>
                </section>
            </main>

            <footer>
                <div className="container footer-content">
                    <div className="footer-social">
                        <a href="https://github.com/Luccas-Manoel" target="_blank"><i className="fab fa-github"></i></a>
                        <a href="https://br.linkedin.com/"  target="_blank"><i className="fab fa-linkedin"></i></a>
                        <a href="https://x.com/Devlucaszz"  target="_blank"><i className="fab fa-x-twitter"></i></a>
                        <a href="https://www.instagram.com/zzlucca_/"  target="_blank"><i className="fab fa-instagram"></i></a>
                    </div>
                    <p>&copy; 2025 Lucas Manoel. Todos os direitos reservados.</p>
                </div>
            </footer>
            
            <Script 
                src="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/js/all.min.js" 
                strategy="lazyOnload" 
            />
        </>
    );
};

export default SobrePage;