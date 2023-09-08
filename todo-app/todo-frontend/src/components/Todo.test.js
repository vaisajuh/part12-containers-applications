import React from 'react'
import '@testing-library/jest-dom'
import { render } from '@testing-library/react'
import Todo from './Todo'


const todo = {
    text: 'jees',
    done: true
  }

test('renders content', () => {
    
    const { container } = render(<Todo todo={todo} />)
    const div = container.querySelector('.todo')

    expect(div).toHaveTextContent(
        'jees'
      )

})