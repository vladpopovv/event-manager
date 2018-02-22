const ChatUtility = {
  getChatName(chat) {
    const { participants } = chat;
    const participantsFullName = [];
    participants.forEach((participant) => {
      participantsFullName.push(`${participant.firstname} ${participant.lastname}`);
      participantsFullName.push(`${participant.firstname} ${participant.lastname}`);
    });

    return participantsFullName.join(', ');
  },
};

export default ChatUtility;
