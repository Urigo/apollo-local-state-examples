import { Component, Input } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Message } from './types';

import gql from 'graphql-tag';

@Component({
  selector: 'app-selector',
  template: `
    <input type="checkbox" [checked]="message.selected" (change)="select()" />
  `
})
export class SelectorComponent {
  @Input() message: Message;

  constructor(private apollo: Apollo) {}

  select() {
    this.apollo.mutate({
      mutation: gql`
        mutation selectMessage($messageId: Int!) {
          selectMessage(messageId: $messageId) @client {
            selected
          }
        }
      `,
      variables: {
        messageId: this.message.id,
      },
    }).subscribe();
  }
}