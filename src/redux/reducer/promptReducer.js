import {createSlice} from '@reduxjs/toolkit';

const counterSlice = createSlice({
  name: 'counter',
  initialState: {
    prompts: [
      {
        prompt: 'I’m really passionate about',
        text: 'Flying aircrafts ',
        id: 0,
        selected: true,
      },
      {
        prompt: 'A movie I was influenced by',
        text: 'Segio',
        id: 1,
        selected: true,
      },
      {
        prompt: 'A trait I admire in people',
        text: 'Being happy in life',
        id: 2,
        selected: true,
      },
      {prompt: 'To me success is', text: '', id: 3, selected: false},

      {
        prompt: 'A social issue I care deeply about',
        text: '',
        id: 4,
        selected: false,
      },
      {
        prompt: 'A historical figure I want to meet',
        text: '',
        id: 5,
        selected: false,
      },
    ],
    selectedPrompts: {},
    selectedPromptsList: [
      {
        prompt: 'I’m really passionate about',
        text: 'Flying aircrafts ',
        id: 0,
        selected: true,
      },
      {
        prompt: 'A movie I was influenced by',
        text: 'Segio',
        id: 1,
        selected: true,
      },
      {
        prompt: 'A trait I admire in people',
        text: 'Being happy in life',
        id: 2,
        selected: true,
      },
    ],

    filledPromptsCount: 3,
  },
  reducers: {
    onSelectedPrompt: (state, actions) => {
      state.selectedPrompts = state.prompts[actions?.payload];

      // const promptId = actions.payload;
      // const selectedPrompt = state.prompts.find(i => i.id === promptId);
      // if (selectedPrompt.selected) {
      //   // If the prompt is already selected, deselect it
      //   console.log('stage0');
      //   selectedPrompt.selected = false;
      //   state.selectedPromptsList = state.selectedPromptsList.filter(
      //     id => id !== promptId,
      //   );
      // } else {
      //   // If the prompt is not selected, check if we have space for a new selection
      //   if (state.selectedPromptsList.length < 3) {
      //     selectedPrompt.selected = true;
      //     state.selectedPromptsList.push(promptId);
      //     state.selectedPrompts = state.prompts[actions?.payload];
      //     console.log('stage1', state.selectedPromptsList.length);
      //   } else {
      //     console.log('stage3');
      //     // state.selectedPromptsList = [];
      //     // state.selectedPrompts;
      //     state.selectedPrompts = null;
      //   }
      // }
    },
    onClearPrompt: state => {
      state.selectedPrompts = null;
    },
    onPromptTextAdd: (state, actions) => {
      const selected = state.prompts.findIndex(
        i => i.id === state.selectedPrompts?.id,
      );
      if (state.prompts[selected].text && actions?.payload === '') {
        state.prompts[selected].text = '';
        state.filledPromptsCount -= 1;
      } else if (
        state.prompts[selected].text === '' &&
        actions?.payload !== ''
      ) {
        if (state.filledPromptsCount < 3) {
          state.prompts[selected].text = actions?.payload;
          state.filledPromptsCount += 1;
        } else {
          state.prompts;
        }
      } else {
        state.prompts[selected].text = actions?.payload;
      }
    },
    updateText: (state, action) => {
      const {id, text} = action.payload;
      const isExist = state.selectedPromptsList.find(item => item.id === id);
      const filteredItem = state.prompts.find(item => item.id === id);
      if (isExist) {
        isExist.text = text;
        filteredItem.text = text;
        filteredItem.selected = text ? true : false;

        // If the prompt is already selected, deselect it
        state.selectedPromptsList = state.selectedPromptsList.filter(
          item => item.text,
        );
      } else {
        if (state.selectedPromptsList.length < 3 && text) {
          console.log('first prompt');
          filteredItem.text = text;
          filteredItem.selected = true;
          state.selectedPromptsList.push(filteredItem);
        }
      }
      console.log(state.selectedPromptsList);
      // Check if the new text is non-empty
      // if (text.trim() !== '') {
      //   // Count how many of the first three items already have non-empty text
      //   const nonEmptyCount = state.prompts.filter(
      //     item => maxTextItems.includes(item.id) && item.text.trim() !== '',
      //   ).length;
      //   // console.log(
      //   //   'nonEmptyCount',
      //   //   state.selectedPromptsList.find(item => item.id === id),
      //   // );
      //   // If there are already 3 items with non-empty text, clear the text of the first non-empty item
      //   if (nonEmptyCount >= 3) {
      //     const itemToClear = state.prompts.find(
      //       item => maxTextItems.includes(item.id) && item.text.trim() !== '',
      //     );
      //     if (itemToClear) {
      //       itemToClear.text = '';
      //     }
      //   }
      // }

      // // Update the text of the item with the specified ID
      // const item = state.prompts.find(i => i.id === id);
      // if (item) {
      //   item.text = text;
      // }
    },
  },
});

export const {onPromptTextAdd, onSelectedPrompt, updateText} =
  counterSlice.actions;
export default counterSlice.reducer;

// const store = configureStore({
//   reducer: counterSlice.reducer,
// });
