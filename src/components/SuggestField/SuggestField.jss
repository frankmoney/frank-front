export default {
  suggestionsContainer: {
    position: 'absolute',
    marginTop: 10,
    left: 0,
    right: 0,
    zIndex: 1000,
    display: 'none',
    maxHeight: props => props.maxSuggestionsHeight,
  },
  suggestionsContainerOpen: {
    display: 'block',
  },
  spinnerContainer: {
    display: 'flex',
    justifyContent: 'center',
  },
  suggestion: {
    display: 'block',
  },
  suggestionsList: {
    margin: 0,
    padding: 0,
    listStyleType: 'none',
  },
  field: {
    width: '100%',
  },
}
