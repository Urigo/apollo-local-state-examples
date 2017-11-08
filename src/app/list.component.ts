import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Observable } from 'rxjs/Observable';

import gql from 'graphql-tag';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';

import { Message, Query } from './types';

@Component({
  selector: 'app-list',
  template: `
    <ul>
      <li *ngFor="let message of messages | async">
        <app-selector [message]="message"></app-selector>
        {{message.content}}
        <img width=40 src="{{message.author.image}}">
        ({{message.author.firstName}} {{message.author.lastName}})
      </li>
    </ul>
  `
})
export class ListComponent implements OnInit {
  messages: Observable<Message[]>;
  constructor(private apollo: Apollo) {}

  ngOnInit() {
    this.messages = this.apollo.watchQuery<Query>({
      query: gql`
        query allMessages {
          messages {
            id
            content
            selected @client
            author {
              id
              firstName
              lastName
              image
            }
          }
        }
      `,
    })
      .valueChanges
      .do(result => console.log(result.data.messages))
      .map(result => result.data.messages);
  }
}