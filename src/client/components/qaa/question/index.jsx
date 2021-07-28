import React, { useContext, useState } from 'react';
import { AppContext } from '../../../contexts';

import AnswerList from '../answer/list';
import Helpful from '../../layout/Helpful';

import User from '../../form/fields/User';
import Answer from '../../form/fields/Answer';
import Photos from '../../form/fields/Photos';
import CreateFormModal from '../../form';
import Row from '../../layout/Row';
import Column from '../../layout/Column';
import { validators } from '../../form/utils';


export default function QuestionTile ({ question }) {
  const answers = Object.values(question.answers);
  const [showModal, setShowModal] = useState(false);
  const { product, refetch } = useContext(AppContext);

  return (
    <Column style={{ marginTop: '1em' }}>
      {/* Header */}
      <Row style={{ justifyContent: 'space-between' }}>
        <h3 style={{ margin: 0 }}>Q: {question.question_body}</h3>

        <Helpful
          value={question.question_helpfulness}
          onHelpfulClick={async () => {
            await fetch(`/api/qa/questions/${question.question_id}/helpful`, {
              method: 'PUT'
            });
            refetch();
          }}
          onActionClick={async () => { setShowModal(true); }}
          action="Add Answer"
        />
      </Row>

      {/* Create Question */}
      <CreateFormModal
        title="Submit Your Answer"
        style={{ width: '60%', height: '80%' }}
        subtitle={`${product.name}: ${question.question_body}`}
        endpoint={`/api/qa/questions/${question.question_id}/answers`}
        initial={{ name: '', email: '', body: '', photos: [], product_id: product.id }}
        validations={{
          name: validators.EMPTY,
          email: validators.INVALID_EMAIL,
          body: validators.EMPTY
        }}
        fields={[Answer, User, Photos]}
        showModal={showModal}
        onClick={() => { setShowModal(false); }}
        onSubmit={async () => {
          setShowModal(false);
          await refetch();
        }}
      />

      {/* Answer List */}
      <AnswerList answers={answers} />
    </Column>
  );
}
