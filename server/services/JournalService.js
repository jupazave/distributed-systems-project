'use strict';
/*
  JournalService.js
    Note: Written in ES6
*/

import {Journal} from '../sqldb';
import log from './../libraries/Log';
import {_Error} from './../libraries/Error';

class JournalService {

  constructor() { }

  conceptAction(user_id, action, concept_name, concept_id) {

    let journal = {
      user_id: user_id,
      type_id: concept_id,
      type: 'concept',
      action: action,
      modified_at: new Date(),
      name: concept_name
    }

    return Journal.create(journal);

  }

  topicAction(user_id, action, topic_name, topic_id) {

    let journal = {
      user_id: user_id,
      type_id: topic_id,
      type: 'topic',
      action: action,
      modified_at: new Date(),
      name: topic_name
    }

    return Journal.create(journal);

  }


}

const journalService = new JournalService();
module.exports = journalService;
