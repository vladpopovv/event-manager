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
    messages.forEach((message, i) => {
      if (i > 0 && !moment(message.createdAt).isSame(messages[i - 1].createdAt, 'day')) {
        messageWithDays.push({
          info: moment(messages[i - 1].createdAt).format('DD MMMM YYYY'),
        });
      }
      messageWithDays.push(message);
    });
    if (isFullDialog && messages.length > 0) {
      messageWithDays.push({
        info: moment(messages[messages.length - 1].createdAt).format('DD MMMM YYYY'),
      });
      messageWithDays.push({
        info: 'All messages are shown.',
      });
    }
    return messageWithDays;
  },
};

export default ChatUtility;
