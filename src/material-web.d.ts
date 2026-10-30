import type { DetailedHTMLProps, HTMLAttributes } from 'react'

interface MaterialTextFieldAttributes
  extends HTMLAttributes<HTMLElement> {
  label?: string
  type?: string
  autocomplete?: string
  placeholder?: string
  value?: string
  required?: boolean
  minLength?: number
}


declare module 'react' {
  namespace JSX {
    interface IntrinsicElements {
      'md-outlined-text-field':
        DetailedHTMLProps<
          MaterialTextFieldAttributes,
          HTMLElement
        >
       'md-filled-button': DetailedHTMLProps<HTMLAttributes<HTMLElement> & {
        type?: 'submit' | 'button' | 'reset'
       },
       HTMLElement>
       'md-text-button': DetailedHTMLProps<HTMLAttributes<HTMLElement>, & { type?: 'submit' | 'button' | 'reset'},
       HTMLElement>
    }
  }
}