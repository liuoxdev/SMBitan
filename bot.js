const { Client, LocalAuth, MessageMedia } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const fs = require('fs');

// Inicialização do cliente com autenticação local
console.log('🔄 Iniciando cliente...');
const client = new Client({
  authStrategy: new LocalAuth(),
  puppeteer: {
    headless: false, // Tornar o navegador visível para depuração
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--start-maximized'], // Argumentos do navegador
    dumpio: true, // Exibir logs do navegador no terminal
    slowMo: 250 // Atraso para ajudar na depuração
  }
});

// QR Code
client.on('qr', (qr) => {
  qrcode.generate(qr, { small: true });
  console.log('📲 Escaneie o QR Code com seu WhatsApp!');
});

// Evento de autenticação
client.on('authenticated', () => {
  console.log('🔐 Autenticado com sucesso!');
});

// Falha de autenticação
client.on('auth_failure', (msg) => {
  console.error('❌ Falha na autenticação:', msg);
});

// Bot pronto
client.on('ready', () => {
  console.log('✅ Bot está pronto para uso!');
  // Adiciona um log extra para garantir que a inicialização foi bem-sucedida
  console.log('O cliente foi inicializado corretamente!');
});

// Cliente desconectado
client.on('disconnected', (reason) => {
  console.warn('🔌 Cliente desconectado:', reason);
});

// Enviar imagens da tabela de valores
const enviarTabelaDeValores = async (message) => {
  const imagens = [
    './tabela_valores.jpg',
    './tabela_valores2.jpg',
    './tabela_valores3.jpg',
    './tabela_valores4.jpg'
  ];

  await message.reply('Aqui está a tabela de valores dos mergulhos 😁⬇:');

  for (const path of imagens) {
    if (fs.existsSync(path)) {
      const media = new MessageMedia(
        'image/jpeg',
        fs.readFileSync(path).toString('base64'),
        path.split('/').pop()
      );
      await message.reply(media);
    } else {
      console.warn(`⚠️ Imagem não encontrada: ${path}`);
    }
  }
};

// Respostas automáticas
const respostas = {
  saudacao: `Olá, bem-vindo à Deep Dive! 🌊
Agradecemos seu contato. Conheça nossas modalidades de mergulho, fale com a gente e explore um novo mundo debaixo da água! 🤿✨`,

  prazo: `Temos um prazo rápido para envio de suas fotos!
Em até 24 horas serão todas enviadas. 💙`,

  agradecimento: 'De nada! Fico feliz em ajudar. Se precisar de mais informações, é só chamar! 😊',

  curso: 'Obrigado pelo interesse! Em breve, eu mesmo entrarei em contato com mais detalhes sobre o curso de mergulho. Fique ligado!',

  lancha: 'Sobre informações do passeio de lancha, vou encaminhar o contato do responsável diretamente para ter informações mais precisas!😃  +5581999163732',

  agendamento: 'Logo logo estaremos finalizando o agendamento do seu mergulho! 😎🤿 Fique atento que entraremos em contato em breve para confirmar os detalhes!',

  padrao: 'Para uma melhor solução do seu problema, em breve iremos entrar em contato! 😁'
};

// Análise de mensagens recebidas
client.on('message', async (message) => {
  const texto = message.body.toLowerCase();

  try {
    if (
      ['olá', 'oi', 'bom dia', 'boa tarde', 'boa noite', 'hola', 'hi', 'hello', 'hey'].some(t => texto.includes(t))
    ) {
      await message.reply(respostas.saudacao);
    } else if (
      ['tabela de valores', 'preços', 'preço', 'quais são os valores', 'valor do mergulho', 'quanto custa o mergulho'].some(t => texto.includes(t))
    ) {
      await enviarTabelaDeValores(message);
    } else if (
      ['prazo de entrega', 'fotos', 'quando ficam prontas as fotos', 'quando vou receber as fotos', 'pulseiras', 'cd minhas fotos', 'solicitando', 'pulseira'].some(t => texto.includes(t))
    ) {
      await message.reply(respostas.prazo);
    } else if (
      ['obrigado', 'valeu', 'agradeço', 'gracias', 'thanks', 'obg', 'thank you'].some(t => texto.includes(t))
    ) {
      await message.reply(respostas.agradecimento);
    } else if (
      texto.includes('curso de mergulho')
    ) {
      await message.reply(respostas.curso);
    } else if (
      ['passeio de lancha', 'passeio de barco', 'lancha'].some(t => texto.includes(t))
    ) {
      await message.reply(respostas.lancha);
    } else if (
      ['agendar mergulho', 'quero agendar um mergulho', 'agendar', 'eu quero agendar um mergulho', 'horário de mergulho'].some(t => texto.includes(t))
    ) {
      await message.reply(respostas.agendamento);
    } else {
      await message.reply(respostas.padrao);
    }
  } catch (err) {
    console.error('❌ Erro ao responder mensagem:', err);
  }
});

// Inicializar o cliente
client.initialize();
