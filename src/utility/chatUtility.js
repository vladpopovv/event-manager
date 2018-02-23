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

  getTimeMessage(date) {
    return moment(date).format('LT');
  },
};

export default ChatUtility;
