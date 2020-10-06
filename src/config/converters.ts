import { MessageEntity, UserEntity } from 'src/app/app-types';

// TODO: You need to implement all below methods for supporting your busiess.

export function convertUser(userFromBackend: any): UserEntity {
  return userFromBackend;
}

export function convertMessages(newMessages: any[], exsitingMessages: MessageEntity[]): MessageEntity[] {
  const messages: MessageEntity[] = exsitingMessages || [];
  newMessages.forEach(item => {
    messages.splice(0, 0, item);
  });
  return messages.slice(0, 50);
}