const config = {
  padding: {
    medium: { paddingTop: '6px', paddingRight: '16px', paddingBottom: '6px', paddingLeft: '16px' },
    small: { paddingTop: '3px', paddingRight: '9px', paddingBottom: '3px', paddingLeft: '9px' },
    large: { paddingTop: '8px', paddingRight: '22px', paddingBottom: '8px', paddingLeft: '22px' }
  },
  styles: {
    'button-secondary-contained-large': {
      default: {
        backgroundColor: 'rgb(253, 193, 0)',
        borderBottomColor: 'rgb(45, 46, 44)',
        textDecorationColor: 'rgb(45, 46, 44)',
        borderRadius: '4px',
        padding: 'large'
      },
      hover: {
        backgroundColor: 'rgb(253, 189, 0)',
        borderBottomColor: 'rgb(45, 46, 44)',
        textDecorationColor: 'rgb(45, 46, 44)',        
      }
    },
    'chip-primary-text-medium': {
      default: {
        backgroundColor: 'rgb(238, 53, 54)',
        borderBottomColor: 'rgb(255, 255, 255)',
        textDecorationColor: 'rgb(255, 255, 255)',
        borderRadius: '16px'
      }
    }
  }
};

module.exports = config;