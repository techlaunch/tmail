import glamorous from 'glamorous/dist/glamorous.cjs.tiny';

const Alert = glamorous('div')({
  width: '300px',
  minHeight: '50px',
  margin: '10px 0 0 0',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  borderRadius: '2px',
  fontSize: '11px',
  boxShadow: '0 8px 12px 0 rgba(0,0,0,0.3)',
  position: 'relative',
  '&.scale-enter': {
    transform: 'scale(0)'
  },
  '&.scale-enter.scale-active-enter': {
    transform: 'scale(1)',
    transition: 'all 250ms cubic-bezier(0, 0, 0.5, 1.5)'
  },
  '&.scale-exit': {
    transform: 'scale(1)'
  },
  '&.scale-exit.scale-active-exit': {
    transform: 'scale(0)',
    transition: 'all 250ms ease-in-out'
  },
  '&.fade-enter': {
    opacity: '0.1'
  },
  '&.fade-enter.fade-active-enter': {
    opacity: '1',
    transition: 'all 250ms ease-out'
  },
  '&.fade-exit': {
    opacity: '1'
  },
  '&.fade-exit.fade-active-exit': {
    opacity: '0.1',
    transition: 'all 250ms ease-in'
  }
}, props => ({
  backgroundColor: `${props.glam.dark ? '#333' : '#fff'}`,
  color: `${props.glam.dark ? '#fff' : '#333'}`
}));

export default Alert;
