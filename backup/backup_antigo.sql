-- phpMyAdmin SQL Dump
-- version 4.3.8
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Tempo de geração: 25/12/2017 às 21:36
-- Versão do servidor: 5.5.51-38.2
-- Versão do PHP: 5.6.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Banco de dados: `micro490_curu`
--

-- --------------------------------------------------------

--
-- Estrutura para tabela `categoria`
--

CREATE TABLE IF NOT EXISTS `categoria` (
  `idCategoria` int(10) unsigned NOT NULL,
  `nome` varchar(50) NOT NULL,
  `descricao` varchar(1024) DEFAULT NULL
) ENGINE=InnoDB AUTO_INCREMENT=56 DEFAULT CHARSET=utf8;

--
-- Fazendo dump de dados para tabela `categoria`
--

INSERT INTO `categoria` (`idCategoria`, `nome`, `descricao`) VALUES
(1, 'Grupos de aborto/defesa', 'Sites que contêm informações ou argumentos prós ou contra o aborto, por exemplo, métodos abortivos, dicas para prevenção ou prática de aborto, efeitos ou a falta de efeitos do ato.'),
(2, 'Conteúdo adulto/maduro', 'Sites que contêm informações ou argumentos prós ou contra o aborto, por exemplo, métodos abortivos, dicas para prevenção ou prática de aborto, efeitos ou a falta de efeitos do ato.'),
(3, 'Anúncios', 'Sites com anúncios ou banners on-line sempre serão permitidos. Esses não incluem servidores de anúncios com mensagens específicas para adultos.'),
(4, 'Álcool/tabaco', 'Sites que promovem ou oferecem produtos de álcool/tabaco, ou apresentam os meios para sua produção. Inclui os que defendem, recomendam ou encorajam o consumo. Mas não contém aqueles que vendem produtos que usam álcool ou tabaco como subcomponentes.'),
(5, 'Artes/entretenimento', 'Sites que promovem e informam sobre filmes, vídeos, televisão, músicas e guias de programação, livros, quadrinhos, cinemas, galerias, artistas ou avaliações de entretenimento.'),
(6, 'Negócios/economia', 'Sites dedicados a empresas, informações de negócios, economia, marketing, administração e empreendedorismo. Não inclui sites que oferecem serviços definidos em outra categoria (por exemplo, de empresas de tecnologia da informação ou que vendem serviços de viagem).'),
(7, 'Chat/mensagens instantâneas', 'Sites que disponibilizam recursos de bate-papo ou mensagens instantâneas, ou downloads para clientes.'),
(8, 'Culto/ocultismo', 'Sites que promovem ou oferecem métodos, meios de instrução ou outros recursos para afetar ou influenciar eventos reais usando feitiços, maldições, poderes mágicos ou seres sobrenaturais.'),
(9, 'Instituições culturais', 'Sites patrocinados por instituições culturais ou com informações sobre museus, galerias e teatros (não incluem cinemas). Inclui grupos como 4-H e Boy Scouts of America.'),
(10, 'Drogas/drogas ilícitas', 'Sites que promovem, oferecem, vendem, fornecem, encorajam ou defendem de alguma forma o uso recreativo ou ilegal, o cultivo, a fabricação ou a distribuição de drogas, produtos farmacêuticos, plantas ou produtos químicos tóxicos e toda parafernália associada. Contém também sites que abordam ou promovem o uso e o abuso de drogas controladas, e seus equipamentos associados, além dos que informam sobre drogas aprovadas e seu uso medicinal, e promovem a utilização de produtos químicos que não são regulados pelo FDA.'),
(11, 'Educação', 'Sites educativos e de educação à distância, e que comercializam informações ou programas escolares. Inclui os sites patrocinados por escolas, instituições de ensino e grupos de professores ou alunos.'),
(12, 'E-mail', 'Sites que oferecem serviços de webmail, como leitura de e-mails, e-cards e serviços de lista de endereçamento on-line.'),
(13, 'Para crianças', 'Sites projetados especialmente para crianças.'),
(14, 'Downloads de freeware/software', 'Sites dedicados a download eletrônico de pacotes de software, pagos ou não.'),
(15, 'Jogos de azar', 'Sites em que o usuário pode fazer apostas ou participar de grupos de apostas (inclusive loterias) on-line. Inclui os que fornecem informações, assistência, recomendações ou treinamento sobre como fazer apostas ou participar de jogos de azar. Não inclui sites de hotéis ou cassinos off-line (quando não se enquadram nos requisitos acima), ou os que comercializam produtos ou máquinas associados.'),
(16, 'Jogos', 'Sites que contêm informações ou que apoiam jogos de azar ou que têm downloads de videogames, jogos de computador, jogos eletrônicos, dicas e conselhos sobre jogos ou sobre como obter cheat codes. Também inclui sites dedicados à venda de jogos de tabuleiro, bem como publicações e revistas dedicadas a jogos. Inclui sites que ofereçam suporte ou hospedem sorteios e brindes on-line.'),
(17, 'Órgãos governamentais', 'Sites patrocinados por (ou que fornecem informações sobre) governos, agências governamentais e serviços públicos, como tributação e serviços emergenciais. Inclui também sites que abordam ou explicam leis de diversas agências governamentais.'),
(18, 'Sistemas de invasão/evasão de proxy', 'Sites que contêm informações sobre o acesso ou uso ilegal ou questionável de equipamentos de comunicação/software, ou ensinam a como driblar os recursos do servidor proxy ou obter acesso a URLs ignorando o servidor proxy.'),
(19, 'Integridade', 'Sites que fornecem conselhos e informações sobre saúde em geral, por exemplo, fitness e bem-estar, saúde pessoal ou serviços médicos, medicamentos, terapias alternativas e complementares, informações médicas sobre alimentos, odontologia, optometria, psiquiatria geral, autoajuda e organizações de assistência dedicadas a uma determinada doença ou quadro de saúde.'),
(20, 'Humor/piadas', 'Sites especializados em humor, comédia, piadas e coisas divertidas. Pode incluir sites com humor ou piadas de conteúdo adulto. Sites de materiais para adultos também podem ter a classificação de categoria Conteúdo adulto/maduro.'),
(21, 'Habilidades ilegais/questionáveis', 'Sites que defendem ou recomendam a prática de atos ilegais, como roubo de serviços, fuga à aplicação da lei, fraude, técnicas de furto e infração de direitos autorais. Também inclui sites que forneçam ou vendam materiais educacionais questionáveis, como trabalhos de conclusão de curso.'),
(22, 'Tecnologia da informação/computadores', 'Sites que patrocinam ou fornecem informações sobre computadores, tecnologia, internet e organizações e empresas relacionadas à tecnologia.'),
(23, 'Leilões virtuais', 'Sites que dão suporte à oferta e compra de bens entre pessoas. Não inclui anúncios classificados.'),
(24, 'Internet Watch Foundation CAIC', 'Sites que a Internet Watch Foundation considera detentores de materiais potencialmente criminosos para Internet, incluindo conteúdos de abuso sexual de crianças hospedados em qualquer parte do globo, materiais obscenos e ilegais para adultos hospedados no Reino Unido (RU) e imagens não fotográficas de pedofilia hospedadas no RU.'),
(25, 'Roupas íntimas/trajes de banho', 'Sites com imagens ou ofertas de trajes de banho, roupas íntimas ou outros tipos de roupas sugestivas. Não inclui sites que vendam roupas íntimas como uma subseção de outros produtos oferecidos.'),
(26, 'Busca de empregos', 'Sites que fornecem assistência à descoberta de vagas e ferramentas para localização de potenciais empregadores.'),
(27, 'Malware', 'Sites que hospedam softwares que se transferem dissimuladamente para o sistema do usuário com o objetivo de coletar informações e monitorar as atividades do usuário. Inclui também sites infectados por softwares destrutivos ou mal-intencionados como vírus, cavalos de troia ou worms especificamente projetados para danificar, interferir, atacar ou manipular sistemas de computadores sem o consentimento do usuário.'),
(28, 'Exército', 'Sites que promovem ou fornecem informações sobre unidades militares ou serviços armados.'),
(29, 'Multimídia', 'Sites que vendem, entregam ou transmitem por streaming música ou vídeo em um formato qualquer, incluindo aqueles que disponibilizam downloads para seus visualizadores.'),
(30, 'Notícias/mídia', 'Sites dedicados principalmente ao fornecimento de informações ou comentários sobre eventos atuais ou questões contemporâneas. Também inclui estações de rádio e revistas. Não inclui sites que possam ser classificados em outras categorias.'),
(31, 'Não classificado', 'Sites não revisados e classificados porque não receberam visualizações registradas ou porque o número de visualizações é extremamente baixo. Os clientes podem enviar uma solicitação para que a classificação de uma URL no banco de dados do Dell SonicWALL Content Filtering seja reavaliada ou para que uma URL previamente desconhecida seja classificada e adicionada ao banco de dados.'),
(32, 'Nudismo', 'Sites com representações do corpo humano nu ou seminu. Essas representações não são necessariamente sexuais na intenção ou no efeito, podendo abranger sites contendo pinturas de nus ou galerias de fotos de natureza artística. Essa categoria também inclui sites nudistas ou naturalistas contendo fotos de pessoas nus.'),
(33, 'Bancos on-line', 'Sites que oferecem ou promovem serviços bancários (on-line ou off-line) ou outros tipos de informações financeiras, como empréstimos. Não inclui sites que oferecem informações do mercado, corretagem ou serviços de transações.'),
(34, 'Corretagem/transação on-line', 'Sites que fornecem ou promovem comércio de valores mobiliários e gestão de ativos de investimento (on-line ou off-line). Inclui também sites de seguros, além dos que oferecem estratégias, cotações e notícias de investimentos financeiros.'),
(35, 'Pay to Surf', 'Sites que pagam usuários em dinheiro ou em prêmios para que cliquem ou leiam links, e-mails ou páginas da Web específicos.'),
(36, 'Encontros e namoros', 'Sites que promovem relacionamentos interpessoais.'),
(37, 'Política e grupos de defesa', 'Sites que divulgam informações sobre ou sejam patrocinados por partidos políticos, grupos com interesses específicos ou qualquer organização que defenda mudanças ou reformas na política pública, de opinião popular, nos comportamentos sociais ou nas atividades econômicas.'),
(38, 'Pornografia', 'Sites que contêm sexo explícito com o propósito de despertar interesse sexual ou lascivo.'),
(39, 'Setor imobiliário', 'Sites sobre compra, venda e locação de imóveis ou propriedades.'),
(40, 'Referência', 'Sites que contêm referências pessoais, profissionais ou educacionais, além de dicionários on-line, mapas, censo, almanaques, catálogos de biblioteca, sites relacionados à genealogia e informações científicas.'),
(41, 'Religião', 'Sites que promovem ou divulgam religiões, tradicionais ou não, ou assuntos relacionados à religião, além de igrejas, sinagogas e outros locais de adoração. Não inclui sites sobre feitiçaria (Culto/ocultismo) ou crenças ateístas.'),
(42, 'Restaurantes e comidas', 'Sites que listam, avaliam, discutem, anunciam e promovem alimentos, serviços de bufê, serviços de restaurante, culinária e receitas.'),
(43, 'Mecanismos de pesquisa e portais', 'Sites que dão suporte a pesquisas na internet, índices e diretórios.'),
(44, 'Educação sexual', 'Sites que contêm material gráfico sobre reprodução, desenvolvimento sexual, práticas de sexo seguro, sexualidade, controle de natalidade e desenvolvimento sexual. Também inclui sites que oferecem dicas para uma melhor vida sexual, bem como produtos usados para intensificação do prazer sexual.'),
(45, 'Comércio', 'Sites que fornecem ou anunciam maneiras de obter bens ou serviços. Não inclui sites que possam ser enquadrados em outras categorias, como veículos ou armas.'),
(46, 'Redes sociais', 'Comunidades e sites que permitem a interação entre usuários, a publicação de mensagens, imagens ou outros tipos de comunicação com grupos de pessoas. Não inclui blogs ou sites pessoais.'),
(47, 'Sociedade e estilo de vida', 'Sites que fornecem informações de assuntos relacionados ao dia a dia. Não inclui aqueles que podem ser enquadrados em outras categorias, como artes e entretenimento, saúde e esportes/recreação.'),
(48, 'Esportes/recreação', 'Sites que promovem ou fornecem informações sobre esportes para espectadores, atividades recreativas ou hobbies. Inclui sites que discutem ou informam sobre camping, jardinagem e coleções.'),
(49, 'Viagens', 'Sites que promovem ou oferecem oportunidades de planejamento de viagens, incluindo busca e reservas de viagem, locação de veículos, descrição de destinos ou promoções de hotéis e cassinos.'),
(50, 'Grupos de notícias Usenet', 'Sites que oferecem acesso a grupos de notícias Usenet ou outros sistemas de mensagens ou BBS.'),
(51, 'Veículos', 'Sites que abordam ou promovem informações sobre veículos, barcos ou aeronaves. Inclui os sites que apoiam o comércio on-line de veículos ou peças.'),
(52, 'Violência, ódio e racismo', 'Sites com representações de lesões corporais ou danos à propriedade muito graves, que defendem ou dão dicas sobre como causar tais atos. Inclui também aqueles que defendem ou contêm representações de hostilidade, incitam agressão ou denigrem pessoas ou grupos por causa de raça, religião, gênero, nacionalidade, origem étnica ou outros aspectos involuntários.'),
(53, 'Armas', 'Sites que vendem, analisam ou descrevem armas de fogo, facas ou equipamentos de artes marciais e seus acessórios, ou apresentam informações sobre a sua utilização ou outras modificações. Não inclui sites de colecionadores ou que defendem ou se opõem ao desarmamento.'),
(54, 'Comunicações na Web', 'Sites que permitem ou oferecem comunicação baseada na Web via e-mail, chat, mensagens instantâneas ou quadros de mensagens.'),
(55, 'Hospedagem na Web', 'Sites de organizações que fornecem páginas de domínio de nível superior, além de comunidades da Web ou serviços de hospedagem.');

-- --------------------------------------------------------

--
-- Estrutura para tabela `chave`
--

CREATE TABLE IF NOT EXISTS `chave` (
  `idChave` int(10) unsigned NOT NULL,
  `palavra` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estrutura para tabela `chave_has_categoria`
--

CREATE TABLE IF NOT EXISTS `chave_has_categoria` (
  `chave` int(10) unsigned NOT NULL,
  `categoria` int(10) unsigned NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estrutura para tabela `faixa`
--

CREATE TABLE IF NOT EXISTS `faixa` (
  `idFaixa` int(10) unsigned NOT NULL,
  `nome` varchar(50) NOT NULL,
  `descricao` varchar(1024) DEFAULT NULL
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

--
-- Fazendo dump de dados para tabela `faixa`
--

INSERT INTO `faixa` (`idFaixa`, `nome`, `descricao`) VALUES
(1, '0 à 10 anos', ''),
(2, '11 à 12 anos', ''),
(3, '13 à 14 anos', ''),
(4, '15 à 16  anos', '');

-- --------------------------------------------------------

--
-- Estrutura para tabela `faixa_has_categoria`
--

CREATE TABLE IF NOT EXISTS `faixa_has_categoria` (
  `faixa` int(10) unsigned NOT NULL,
  `categoria` int(10) unsigned NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Fazendo dump de dados para tabela `faixa_has_categoria`
--

INSERT INTO `faixa_has_categoria` (`faixa`, `categoria`) VALUES
(1, 1),
(1, 2),
(1, 3),
(1, 4),
(1, 5),
(1, 6),
(1, 7),
(1, 8),
(1, 10),
(1, 14),
(1, 15),
(1, 17),
(1, 18),
(1, 19),
(1, 20),
(1, 21),
(1, 23),
(1, 24),
(1, 25),
(1, 26),
(1, 27),
(1, 28),
(1, 31),
(1, 32),
(1, 33),
(1, 34),
(1, 35),
(1, 36),
(1, 37),
(1, 38),
(1, 39),
(1, 42),
(1, 43),
(1, 44),
(1, 45),
(1, 46),
(1, 47),
(1, 48),
(1, 49),
(1, 50),
(1, 51),
(1, 52),
(1, 53);

-- --------------------------------------------------------

--
-- Estrutura para tabela `url`
--

CREATE TABLE IF NOT EXISTS `url` (
  `idUrl` int(10) unsigned NOT NULL,
  `url` varchar(255) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=62 DEFAULT CHARSET=utf8;

--
-- Fazendo dump de dados para tabela `url`
--

INSERT INTO `url` (`idUrl`, `url`) VALUES
(1, 'www.gynpages.com'),
(2, 'www.abortionfacts.com'),
(3, 'www.humorbomb.org'),
(4, 'www.steakandcheese.com'),
(5, 'www.punchbaby.com'),
(6, 'www.adblade.com'),
(7, 'www.netvert.biz'),
(8, 'www.budweiser.com'),
(9, 'www.coors.com'),
(10, 'www.imdb.com'),
(11, 'www.eonline.com'),
(12, 'www.moviephone.com'),
(13, 'www.ge.com'),
(14, 'www.sunbeam.com'),
(15, 'www.web.icq.com/icqchat'),
(16, 'www.aim.com'),
(17, 'www.messenger.msn.com'),
(18, 'www.phlums.com'),
(19, 'www.terrificator.com'),
(20, 'www.childmuseum.org'),
(21, 'www.scouting.org'),
(22, 'www.4h.org'),
(23, 'www.marijuana.org'),
(24, 'www.hightimes.com'),
(25, 'www.education-world.com'),
(26, 'www.ed.govwww.nyu.edu'),
(27, 'www.email.com'),
(28, 'www.hotmail.com'),
(29, 'www.yahooligans.com'),
(30, 'www.kidsites.com'),
(31, 'www.panwapa.com'),
(32, 'www.download.com'),
(33, 'www.tucows.com'),
(34, 'www.gambling.com'),
(35, 'www.casino.com'),
(36, 'www.sportsbook.com'),
(37, 'www.nintendo.com'),
(38, 'www.gamespot.com'),
(39, 'www.gamesdomain.com'),
(40, 'www.whitehouse.gov'),
(41, 'www.federalreserve.gov'),
(42, 'www.anonymizer.com'),
(43, 'astalavista.box.sk'),
(44, 'www.happyhacker.org'),
(45, 'www.phreak.com'),
(46, 'www.cvs.com'),
(47, 'www.webmd.com'),
(48, 'www.ahajokes.com'),
(49, 'www.comedycentral.com'),
(50, 'www.the-jokes.com'),
(51, 'www.antiessays.com'),
(52, 'www.monkeysnatcher.com'),
(53, 'www.dell.com'),
(54, 'www.microsoft.com'),
(55, 'www.javaworld.com'),
(56, 'www.bidfind.com'),
(57, 'www.ebay.com'),
(58, 'wovusej.com'),
(59, 'xujoket.com'),
(60, 'www.victoriassecret.com'),
(61, 'www.fredericks.com');

-- --------------------------------------------------------

--
-- Estrutura para tabela `url_has_categoria`
--

CREATE TABLE IF NOT EXISTS `url_has_categoria` (
  `url` int(10) unsigned NOT NULL,
  `categoria` int(10) unsigned NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estrutura para tabela `user`
--

CREATE TABLE IF NOT EXISTS `user` (
  `iduser` int(10) unsigned NOT NULL,
  `username` varchar(45) NOT NULL,
  `email` varchar(255) NOT NULL,
  `pass` char(64) NOT NULL,
  `type` enum('user','admin') NOT NULL,
  `date_entered` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estrutura para tabela `versao`
--

CREATE TABLE IF NOT EXISTS `versao` (
  `idVesao` int(10) unsigned NOT NULL,
  `nome` varchar(50) NOT NULL,
  `descricao` varchar(1024) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Índices de tabelas apagadas
--

--
-- Índices de tabela `categoria`
--
ALTER TABLE `categoria`
  ADD PRIMARY KEY (`idCategoria`);

--
-- Índices de tabela `chave`
--
ALTER TABLE `chave`
  ADD PRIMARY KEY (`idChave`);

--
-- Índices de tabela `chave_has_categoria`
--
ALTER TABLE `chave_has_categoria`
  ADD PRIMARY KEY (`chave`,`categoria`), ADD KEY `fk_Chave_has_Categoria_Categoria1_idx` (`categoria`), ADD KEY `fk_Chave_has_Categoria_Chave1_idx` (`chave`);

--
-- Índices de tabela `faixa`
--
ALTER TABLE `faixa`
  ADD PRIMARY KEY (`idFaixa`);

--
-- Índices de tabela `faixa_has_categoria`
--
ALTER TABLE `faixa_has_categoria`
  ADD PRIMARY KEY (`faixa`,`categoria`), ADD KEY `fk_Faixa_has_Categoria_Categoria1_idx` (`categoria`), ADD KEY `fk_Faixa_has_Categoria_Faixa_idx` (`faixa`);

--
-- Índices de tabela `url`
--
ALTER TABLE `url`
  ADD PRIMARY KEY (`idUrl`);

--
-- Índices de tabela `url_has_categoria`
--
ALTER TABLE `url_has_categoria`
  ADD PRIMARY KEY (`url`,`categoria`), ADD KEY `fk_Site_has_Categoria_Categoria1_idx` (`categoria`), ADD KEY `fk_Site_has_Categoria_Site1_idx` (`url`);

--
-- Índices de tabela `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`iduser`), ADD UNIQUE KEY `username_UNIQUE` (`username`), ADD UNIQUE KEY `email_UNIQUE` (`email`);

--
-- Índices de tabela `versao`
--
ALTER TABLE `versao`
  ADD PRIMARY KEY (`idVesao`);

--
-- AUTO_INCREMENT de tabelas apagadas
--

--
-- AUTO_INCREMENT de tabela `categoria`
--
ALTER TABLE `categoria`
  MODIFY `idCategoria` int(10) unsigned NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=56;
--
-- AUTO_INCREMENT de tabela `chave`
--
ALTER TABLE `chave`
  MODIFY `idChave` int(10) unsigned NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT de tabela `faixa`
--
ALTER TABLE `faixa`
  MODIFY `idFaixa` int(10) unsigned NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT de tabela `url`
--
ALTER TABLE `url`
  MODIFY `idUrl` int(10) unsigned NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=62;
--
-- AUTO_INCREMENT de tabela `user`
--
ALTER TABLE `user`
  MODIFY `iduser` int(10) unsigned NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT de tabela `versao`
--
ALTER TABLE `versao`
  MODIFY `idVesao` int(10) unsigned NOT NULL AUTO_INCREMENT;
--
-- Restrições para dumps de tabelas
--

--
-- Restrições para tabelas `chave_has_categoria`
--
ALTER TABLE `chave_has_categoria`
ADD CONSTRAINT `fk_Chave_has_Categoria_Categoria1` FOREIGN KEY (`categoria`) REFERENCES `categoria` (`idCategoria`) ON DELETE NO ACTION ON UPDATE NO ACTION,
ADD CONSTRAINT `fk_Chave_has_Categoria_Chave1` FOREIGN KEY (`chave`) REFERENCES `chave` (`idChave`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Restrições para tabelas `faixa_has_categoria`
--
ALTER TABLE `faixa_has_categoria`
ADD CONSTRAINT `fk_Faixa_has_Categoria_Categoria1` FOREIGN KEY (`categoria`) REFERENCES `categoria` (`idCategoria`) ON DELETE NO ACTION ON UPDATE NO ACTION,
ADD CONSTRAINT `fk_Faixa_has_Categoria_Faixa` FOREIGN KEY (`faixa`) REFERENCES `faixa` (`idFaixa`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Restrições para tabelas `url_has_categoria`
--
ALTER TABLE `url_has_categoria`
ADD CONSTRAINT `fk_Site_has_Categoria_Categoria1` FOREIGN KEY (`categoria`) REFERENCES `categoria` (`idCategoria`) ON DELETE NO ACTION ON UPDATE NO ACTION,
ADD CONSTRAINT `fk_Site_has_Categoria_Site1` FOREIGN KEY (`url`) REFERENCES `url` (`idUrl`) ON DELETE NO ACTION ON UPDATE NO ACTION;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
