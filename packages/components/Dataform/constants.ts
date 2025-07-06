// src/components/FormPanel/constants.ts
import { createNamespace } from '@sukin/utils'; // Assuming bem utility is in @/utils

export const bem = createNamespace('form-panel');

// It's good practice to use constants for event names
export const EVENT_SUBMIT = 'submit';
export const EVENT_CLOSE = 'close';