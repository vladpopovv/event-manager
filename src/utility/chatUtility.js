import moment from 'moment';

const ChatUtility = {
  getChatName(chat) {
    const { participants } = chat;
    const participantsFullName = [];
    participants.forEach(participant => (
      participantsFullName.push(`${participant.firstname} ${participant.lastname}`)
    ));

    return participantsFullName.join(', ');
  },

  getUniqueMessages(messages) {
    const messagesObject = {};
    messages.forEach((message) => {
      messagesObject[message.id] = message;
    });
    return Object.values(messagesObject).reverse();
  },

  getChatById(chatId, chats) {
    if (!chatId) {
      return {};
    }

    let foundedChat = chats.find(chat => chat.id === chatId);
    // foundedChat = !foundedChat ? foundedChat : { isNotFound: true };
    if (!foundedChat) {
      foundedChat = {
        isNotFound: true,
      };
    }

    return foundedChat;
  },

  setNameToChats(chats) {
    const chatsWithName = chats.map(chat => ({
      ...chat,
      name: ChatUtility.getChatName(chat),
    }));
    return chatsWithName;
  },

  getTimeMessage(date) {
    return moment(date).format('LT');
  },

  setDateBetweenDays(messages, isFullDialog) {
    const messageWithDays = [];

    if (!messages.length) {
      return messageWithDays.concat({
        info: 'Send the first message to start the dialog.',
      });
    }

    const lastMessage = messages[messages.length - 1];

    messages.forEach((message, i) => {
      if (i > 0 && !moment(message.createdAt).isSame(messages[i - 1].createdAt, 'day')) {
        messageWithDays.push({
          info: moment(messages[i - 1].createdAt).format('DD MMMM YYYY'),
          createdAt: messages[i - 1].createdAt,
        });
      }
      messageWithDays.push(message);
    });

    if ((isFullDialog && messages.length > 0) || (messages.length < 10 && messages.length > 0)) {
      messageWithDays.push({
        info: moment(lastMessage.createdAt).format('DD MMMM YYYY'),
        createdAt: lastMessage.createdAt,
      });
      messageWithDays.push({
        info: 'It is begining conversation.',
        createdAt: lastMessage.createdAt,
      });
    }
    return messageWithDays;
  },
};

export default ChatUtility;
