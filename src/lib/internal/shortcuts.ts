import type { KeyboardShortcut } from "./input";

/**
 * Default keyboard shortcuts. Can be disabled in `Carta` by
 * passing the `disableDefaultShortcuts` option.
 */
export const DefaultKeyboardShortcuts: KeyboardShortcut[] = [
  // Bold text
  {
    combination: new Set(["control", "b"]),
    action: (input) => input.toggleSelectionSurrounding('**') 
  },
  // Italic text
  {
    combination: new Set(["control", "i"]),
    action: (input) => input.toggleSelectionSurrounding('*') 
  },
  // Link
  {
    combination: new Set(["control", "k"]),
    action: (input) => {
      input.toggleSelectionSurrounding(['[', ']']);
      const position = input.getSelection().end + 1;
      input.insertAt(position, "(url)");
      input.textarea.setSelectionRange(position + 1, position + 4);
    }
  },
  // Code
  {
    combination: new Set(["control", "shift", "k"]),
    action: (input) => input.toggleSelectionSurrounding('`')
  },
  // Undo
  {
    combination: new Set(["control", "z"]),
    preventSave: true,
    action: (input) => {
      const previousValue = input.history.undo();
      if (previousValue !== undefined)
        input.textarea.value = previousValue;
    }
  },
  // Redo
  {
    combination: new Set(["control", "y"]),
    preventSave: true,
    action: (input) => {
      const successiveValue = input.history.redo();
      if (successiveValue !== undefined)
        input.textarea.value = successiveValue;
    }
  }
]