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

  setDateBetweenDays(messages) {
    const messageWithDays = [];
    messages.forEach((message, i) => {
      if (i > 0 && !moment(message.createdAt).isSame(messages[i - 1].createdAt, 'day')) {
        messageWithDays.push({
          info: moment(message.createdAt).format('DD MMMM YYYY'),
        });
      }
      messageWithDays.push(message);
    });
    return messageWithDays;
  },
};

export default ChatUtility;
