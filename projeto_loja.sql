-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Tempo de geração: 17/07/2025 às 23:52
-- Versão do servidor: 10.4.32-MariaDB
-- Versão do PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `projeto_loja`
--

-- --------------------------------------------------------

--
-- Estrutura para tabela `admin`
--

CREATE TABLE `admin` (
  `usuario` varchar(100) NOT NULL,
  `senha` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Despejando dados para a tabela `admin`
--

INSERT INTO `admin` (`usuario`, `senha`) VALUES
('Claudia', '150254claudia'),
('GAMIN', '880317');

-- --------------------------------------------------------

--
-- Estrutura para tabela `ordemdeservico`
--

CREATE TABLE `ordemdeservico` (
  `id` int(11) NOT NULL,
  `nome` varchar(100) DEFAULT NULL,
  `telefone` varchar(20) DEFAULT NULL,
  `aparelho` varchar(100) DEFAULT NULL,
  `defeito` text DEFAULT NULL,
  `tempo` varchar(50) DEFAULT NULL,
  `status` varchar(20) DEFAULT 'Em andamento'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Despejando dados para a tabela `ordemdeservico`
--

INSERT INTO `ordemdeservico` (`id`, `nome`, `telefone`, `aparelho`, `defeito`, `tempo`, `status`) VALUES
(17, 'pedro', '111111111', 'sansung a06', 'nenhum', '1 dia', 'Em andamento'),
(18, 'pedro', '1234', 'sansung a06', 'teste', '1 dia', 'Em andamento'),
(19, 'pedro', '1234', 'sansung a06', 'teste', '1 dia', 'Em andamento');

-- --------------------------------------------------------

--
-- Estrutura para tabela `usuarios`
--

CREATE TABLE `usuarios` (
  `nome` int(11) NOT NULL,
  `senha` int(11) NOT NULL,
  `cpf` int(11) NOT NULL,
  `tel` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Índices para tabelas despejadas
--

--
-- Índices de tabela `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`usuario`);

--
-- Índices de tabela `ordemdeservico`
--
ALTER TABLE `ordemdeservico`
  ADD PRIMARY KEY (`id`);

--
-- Índices de tabela `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`cpf`);

--
-- AUTO_INCREMENT para tabelas despejadas
--

--
-- AUTO_INCREMENT de tabela `ordemdeservico`
--
ALTER TABLE `ordemdeservico`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
