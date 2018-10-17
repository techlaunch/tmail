import React, { PureComponent } from 'react';
import moment from 'moment';
import { Loading } from '../Indicators';
import { OutlinedButton } from '../buttons'

export default class EmailView extends PureComponent {
  state = { 
    loading: true,
    email: null
  }

  onSetEmail = (email) => {
    this.setState({
      loading: false,
      email: email
    })
  }

  onFindEmail = () => {
    const { emails, emailid } = this.props;

    emails.forEach(email => {
      if (email._id === emailid) {
        setTimeout(() => this.onSetEmail(email), 1000);
        return true;
      }
    })
  }

  componentDidUpdate(prevProps) {
    if (prevProps.emails !== this.props.emails) {
      this.onFindEmail();
    }
  }

  componentDidMount() {
    this.onFindEmail();
  }

  render() {
    const { loading, email } = this.state;
    const { onEmailFormChange } = this.props;

    return loading ? (
      <Loading />
    ) : (
      <div>
        <div>
          { email.subject }
          { email.date }
        </div>
        <div>
          { email.sender.email }
          { moment(email.date).format('MM/DD/YYYY') }
        </div>
        <div>
          { email.message }
        </div>

        <OutlinedButton
          href="/home/new-email"
          onClick={() => onEmailFormChange({
            subject: 'RE: ' + email.subject,
            receiver: {
              email: email.sender.email,
            }
          })}
          text="Reply"
        />

        <OutlinedButton
          href="/home/new-email"
          onClick={() => onEmailFormChange({
            subject: 'FW: ' + (email.subject || ''),
            message: `
              date: ${moment(email.date).format('MM/DD/YYYY')}\n
              email: ${email.sender.email}\n
              subject: ${email.subject}\n
              message: ${email.message}
            `
          })}
          text="Forward"
        />
      </div>
    )
  }
}