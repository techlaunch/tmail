import React from 'react';
import { OutlinedInput } from '../inputs';

const EmailForm = (props) => {
  const { form, onEmailFormChange } = props;
  console.log(props);
  return (
    <div style={{
      flex: 1,
    }}>
      <OutlinedInput
        id="to"
        type="text"
        label="To"
        placeholder="Enter Destination Email"
        value={form.receiver.email}
        onChange={(e) => onEmailFormChange({
          ...form,
          receiver: {
            ...form.receiver,
            email: e.target.value
          }
        })}
      />

      <OutlinedInput
        id="subject"
        type="text"
        label="Subject"
        placeholder="Enter A Subject"
        value={form.subject}
        onChange={(e) => onEmailFormChange({
          ...form,
          subject: e.target.value
        })}
      />

      <OutlinedInput
        rows={31}
        id="message"
        type="text"
        label="Message"
        multiline
        placeholder="Enter A Message"
        value={form.message}
        onChange={(e) => onEmailFormChange({
          ...form,
          message: e.target.value
        })}
      />
    
    </div>
  )
}

export default EmailForm;