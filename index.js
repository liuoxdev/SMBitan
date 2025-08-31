const { Client, LocalAuth, MessageMedia } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const fs = require('fs');

// Criação do cliente do WhatsApp
const client = new Client({
  authStrategy: new LocalAuth(), // Sessão local
});

// Gerar o QR Code para autenticação
client.on('qr', (qr) => {
  qrcode.generate(qr, { small: true });
  console.log('Escaneie o QR Code com seu WhatsApp!');
});

// Quando o bot estiver pronto
client.on('ready', () => {
  console.log('Bot está pronto! ✅');
  console.log('Dispositivo autenticado com sucesso! ✅');
});

// Aviso de desconexão
client.on('disconnected', (reason) => {
  console.log('O bot foi desconectado. Tentando reconectar... 🔌');
  console.log(`Motivo da desconexão: ${reason}`);
});

// Função para detectar idioma da mensagem
const detectarIdioma = (msg) => {
  msg = msg.toLowerCase();
  if (msg.includes('hola') || msg.includes('gracias') || msg.includes('curso') || msg.includes('lancha')) {
    return 'es'; // espanhol
  } else if (msg.includes('hello') || msg.includes('hi') || msg.includes('thanks') || msg.includes('course') || msg.includes('boat')) {
    return 'en'; // inglês
  }
  return 'pt'; // português como padrão
};

// Função para enviar menu inicial multilíngue
const enviarMenuInicial = async (message, idioma) => {
  if (idioma === 'es') {
    await message.reply(
      `👋 ¡Hola, bienvenido a Deep Dive! 🌊\n\n` +
      `¡Agradecemos tu contacto. Conoce nuestras modalidades de buceo y explora un nuevo mundo bajo el agua! 🤿✨\n\n` +
      `Elige una opción escribiendo el nombre:\n\n` +
      `1️⃣ *valores* – Ver tabla de precios de buceo 📌\n` +

      `2️⃣ *prazo* – Información sobre la entrega de fotos 📷\n` +

      `3️⃣ *agendar* – Agendar una inmersión📆\n` +

      `4️⃣ *lancha* – Información sobre paseo en lancha 🚤\n` +

      `5️⃣ *cursos* – Más información sobre cursos de buceo 🎓\n` +
      
      `6️⃣ *atendimento* – Hablar con un asistente 👩‍💻\n\n` +
      `Escribe una opción para continuar 👇`
    );
  } else if (idioma === 'en') {
    await message.reply(
      `👋 Hello, welcome to Deep Dive! 🌊\n\n` +
      `We appreciate your contact. Discover our diving packages and explore a new world underwater! 🤿✨\n\n` +
      `Choose an option by typing the name:\n\n` +
      `1️⃣ *valores* – View diving price table 📌\n` +

      `2️⃣ *prazo* – Information about photo delivery 📷\n` +

      `3️⃣ *agendar* – Schedule a dive📆\n` +

      `4️⃣ *lancha* – Information about boat rides 🚤\n` +

      `5️⃣ *cursos* – Learn more about diving courses 🎓\n` +

      `6️⃣ *atendimento* – Talk to an attendant 👩‍💻\n\n` +
      `Type an option to continue 👇`
    );
  } else {
    // Português padrão
    await message.reply(
      `👋 Olá, bem-vindo à Deep Dive! 🌊\n\n` +
      `Agradecemos seu contato. Conheça nossas modalidades de mergulho e explore um novo mundo debaixo da água! 🤿✨\n\n` +
      `Escolha uma opção abaixo digitando o nome:\n\n` +
      `1️⃣ *valores* – Ver tabela de valores dos mergulhos 📌\n` +

      `2️⃣ *prazo* – Informações sobre o envio das fotos 📷\n` +

      `3️⃣ *agendar* – Agendar um mergulho📆\n` +

      `4️⃣ *lancha* – Informações sobre o passeio de lancha 🚤\n` +

      `5️⃣ *cursos* – Saber mais sobre cursos de mergulho 🎓\n` +

      `6️⃣ *atendimento* – Falar com um atendente 👩‍💻\n\n` +
      `Digite uma opção para continuar 👇`
    );
  }
};

// Funções para respostas multilíngues
const enviarTabelaDeValores = async (message, idioma) => {
  try {
    const imagens = [
      './tabela_valores.jpg',
      './tabela_valores2.jpg',
      './tabela_valores3.jpg',
      './tabela_valores4.jpg'
    ];

    if (idioma === 'es') {
      await message.reply('Aquí están nuestras modalidades y tabla de precios de buceo 😁⬇:');
    } else if (idioma === 'en') {
      await message.reply('Here are our diving packages and price table 😁⬇:');
    } else {
      await message.reply('Aqui está as nossas modalidades, e tabela de valores dos mergulhos 😁⬇:');
    }

    for (const imagemPath of imagens) {
      if (fs.existsSync(imagemPath)) {
        const media = new MessageMedia(
          'image/jpeg',
          fs.readFileSync(imagemPath).toString('base64'),
          imagemPath.split('/').pop()
        );
        await message.reply(media);
      } else {
        console.warn(`Imagem não encontrada: ${imagemPath}`);
      }
    }
  } catch (err) {
    console.error('Erro ao enviar tabela:', err);
    await message.reply('Ocorreu um erro ao enviar a tabela de valores.');
  }
};

const enviarPrazoDeEntrega = async (message, idioma) => {
  try {
    if (idioma === 'es') {
      await message.reply(`¡Tenemos un plazo rápido para enviar tus fotos! 
En hasta 24 horas, todas serán enviadas previa solicitud. 💙

Envía el código de 4 dígitos de tu pulsera. O si lo perdiste, envía una selfie de cada participante!`);
    } else if (idioma === 'en') {
      await message.reply(`We have a quick turnaround time for sending your photos! 
Within 24 hours, all photos will be sent upon request. 💙

Please send the 4-digit code from your wristband. Or if lost, send a selfie of each participant!`);
    } else {
      await message.reply(`Temos um prazo rápido para envio de suas fotos! 
Em até 24 horas serão todas enviadas mediante a solicitação. 💙

Encaminhe o código de 4 dígitos de sua pulseira. Ou caso tenha perdido, mande uma selfie de cada participante!`);
    }
  } catch (err) {
    console.error('Erro ao enviar prazo de entrega:', err);
  }
};

const enviarAgradecimento = async (message, idioma) => {
  try {
    if (idioma === 'es') {
      await message.reply('¡De nada! Estamos felices de ayudarte. Si necesitas más información, solo llama! 😊');
    } else if (idioma === 'en') {
      await message.reply('You’re welcome! We’re happy to help. If you need more information, just ask! 😊');
    } else {
      await message.reply('De nada! Ficamos feliz em ajudar. Se precisar de mais informações, é só chamar! 😊');
    }
  } catch (err) {
    console.error('Erro ao enviar agradecimento:', err);
  }
};

const enviarCursoDeMergulho = async (message, idioma) => {
  try {
    if (idioma === 'es') {
      await message.reply('¡Gracias por tu interés! Pronto me pondré en contacto para brindarte más detalles sobre el curso de buceo. ¡Estate atento!');
    } else if (idioma === 'en') {
      await message.reply('Thank you for your interest! I will contact you soon with more details about the diving course. Stay tuned!');
    } else {
      await message.reply('Obrigado pelo interesse! Em breve, eu mesmo entrarei em contato com mais detalhes sobre o curso de mergulho. Fique ligado!');
    }
  } catch (err) {
    console.error('Erro ao enviar informações sobre curso de mergulho:', err);
  }
};

const enviarPasseioDeLancha = async (message, idioma) => {
  try {
    if (idioma === 'es') {
      await message.reply('Para información sobre paseo en lancha, te pasaré el contacto del responsable para más detalles. 😃 +5581999163732');
    } else if (idioma === 'en') {
      await message.reply('For boat ride info, I will send you the contact of the person responsible for more details. 😃 +5581999163732');
    } else {
      await message.reply('Sobre informações do passeio de lancha, vou encaminhar o contato do responsável diretamente para ter informações mais precisas!😃  +5581999163732');
    }
  } catch (err) {
    console.error('Erro ao enviar informações sobre passeio de lancha:', err);
  }
};

const responderAgendamento = async (message, idioma) => {
  try {
    if (idioma === 'es') {
      await message.reply('Pronto finalizaremos tu reserva de buceo! 😎🤿 Esté atento, nos pondremos en contacto para confirmar detalles.');
    } else if (idioma === 'en') {
      await message.reply('We will finalize your dive booking soon! 😎🤿 Stay tuned, we will contact you shortly to confirm details.');
    } else {
      await message.reply('Em breve estaremos finalizando o agendamento do seu mergulho! 😎🤿 Fique atento que entraremos em contato em breve para confirmar os detalhes!');
    }

    // Log do número no terminal
    const numero = message.from.replace('@c.us', '');
    console.log(`📞 Agendamento solicitado por: ${numero}`);

  } catch (err) {
    console.error('Erro ao responder agendamento:', err);
  }
};

// Escuta mensagens recebidas
client.on('message', async (message) => {
  const mensagem = message.body.toLowerCase();

  // Identifica idioma da mensagem para respostas multilíngues
  const idioma = detectarIdioma(mensagem);

  // Mensagem inicial com menu numerado (comparações exatas para mensagens de saudação)
  if (
    mensagem === 'olá' ||
    mensagem === 'oi' ||
    mensagem === 'bom dia' ||
    mensagem === 'boa tarde' ||
    mensagem === 'boa noite' ||
    mensagem === 'hola' ||
    mensagem === 'hi' ||
    mensagem === 'hello' ||
    mensagem === 'hey'
  ) {
    await enviarMenuInicial(message, idioma);
  }
  // Solicitação de tabela de valores
  else if (
    mensagem.includes('valores') ||
    mensagem.includes('tabela de valores') ||
    mensagem.includes('preços') ||
    mensagem.includes('precio') ||
    mensagem.includes('prices') ||
    mensagem.includes('preço') ||
    mensagem.includes('quais são os valores') ||
    mensagem.includes('valor do mergulho') ||
    mensagem.includes('quanto custa o mergulho') ||
    mensagem.includes('how much') ||
    mensagem.includes('how much cost') ||
    mensagem.includes('cuánto cuesta')
  ) {
    await enviarTabelaDeValores(message, idioma);
  }
  // Solicitação de prazo de entrega
  else if (
    mensagem.includes('prazo de entrega') ||
    mensagem.includes('cuando') ||
    mensagem.includes('cuando quedan las fotos') ||
    mensagem.includes('quando ficam prontas as fotos') ||
    mensagem.includes('quando vou receber as fotos') ||
    mensagem.includes('gostaria de solicitar minhas fotos') ||
    mensagem.includes('fotos') ||
    mensagem.includes('pulseiras') ||
    mensagem.includes('cd minhas fotos') ||
    mensagem.includes('solicitando') ||
    mensagem.includes('código') ||
    mensagem.includes('prazo') ||
    mensagem.includes('pulseira')
  ) {
    await enviarPrazoDeEntrega(message, idioma);
  }
  // Gatilho de atendimento
  else if (
    mensagem.includes('atendimento') ||
    mensagem.includes('atención') ||
    mensagem.includes('support') ||
    mensagem.includes('help') ||
    mensagem.includes('assistente')
  ) {
    if (idioma === 'es') {
      await message.reply('¡Uno de nuestros asistentes se pondrá en contacto contigo en breve! 👩‍💻👨‍💻');
    } else if (idioma === 'en') {
      await message.reply('One of our attendants will contact you shortly! 👩‍💻👨‍💻');
    } else {
      await message.reply('Um de nossos atendentes entrará em contato com você em instantes! 👩‍💻👨‍💻');
    }

    // Log do número no terminal
    const numero = message.from.replace('@c.us', '');
    console.log(`📞 Atendimento solicitado por: ${numero}`);
  }
  // Agradecimento
  else if (
    mensagem.includes('obrigado') ||
    mensagem.includes('valeu') ||
    mensagem.includes('agradeço') ||
    mensagem.includes('gracias') ||
    mensagem.includes('thanks') ||
    mensagem.includes('obg') ||
    mensagem.includes('gratidão') ||
    mensagem.includes('thank you')
  ) {
    await enviarAgradecimento(message, idioma);
  }
  // Informações sobre curso de mergulho
  else if (
    mensagem.includes('curso') ||
    mensagem.includes('course') ||
    mensagem.includes('curso de mergulho') ||
    mensagem.includes('cursos') ||
    mensagem.includes('scuba diving')
  ) {
    await enviarCursoDeMergulho(message, idioma);
  }
  // Informações sobre passeio de lancha
  else if (
    mensagem.includes('lancha') ||
    mensagem.includes('boat') ||
    mensagem.includes('paseo en lancha') ||
    mensagem.includes('passeio de lancha')
  ) {
    await enviarPasseioDeLancha(message, idioma);
  }
  // Agendamento de mergulho
  else if (
    mensagem.includes('agendar') ||
    mensagem.includes('schedule') ||
    mensagem.includes('reservar') ||
    mensagem.includes('booking') ||
    mensagem.includes('marcar mergulho')
  ) {
    await responderAgendamento(message, idioma);
  }
  // Qualquer outra mensagem (opcional)
  else {
    if (idioma === 'es') {
      await message.reply('Por favor, escriba una opción válida del menú o salude para comenzar.');
    } else if (idioma === 'en') {
      await message.reply('Please type a valid menu option or greet to start.');
    } else {
      await message.reply('Por favor, digite uma opção válida do menu ou solicite o atendimento que em breve responderemos!😃');
    }
  }
});

// Inicializa o cliente
client.initialize();
