import React from 'react';
import { OutlinedInput } from '../inputs';

const EmailForm = (props) => {
  const { form } = props;

  return (
    <div style={{
      flex: 1,
    }}>
      <OutlinedInput
        id="to"
        type="text"
        label="To"
        placeholder="Enter Destination Email"
        value={form.receiver}
        onChange={(e) => console.log('receiver email')}
      />

      <OutlinedInput
        id="subject"
        type="text"
        label="Subject"
        placeholder="Enter A Subject"
        value={form.receiver}
        onChange={(e) => console.log('email subject')}
      />

      <OutlinedInput
        rows={31}
        id="message"
        type="text"
        label="Message"
        multiline
        placeholder="Enter A Message"
        value={form.receiver}
        onChange={(e) => console.log('email message')}
      />
    
    </div>
  )
}

export default EmailForm;