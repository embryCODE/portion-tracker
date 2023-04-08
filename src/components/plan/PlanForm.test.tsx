import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import PlanForm from '@/src/components/plan/PlanForm'
import { testPlan } from '@/src/core/infra/repositories/TestPlanRepo'

describe('PlanForm', () => {
  const handleSubmit = jest.fn()

  beforeEach(() => {
    handleSubmit.mockClear()
  })

  it('should render', () => {
    const { getByLabelText } = render(
      <PlanForm plan={testPlan} onSubmit={handleSubmit} />
    )
    expect(getByLabelText('Name'))
  })

  it('should update the name when typing', async () => {
    const user = userEvent.setup()

    render(<PlanForm plan={testPlan} onSubmit={handleSubmit} />)

    const input = screen.getByLabelText<HTMLInputElement>('Name')
    expect(input.value).toBe('Test Plan')

    await user.clear(input)
    await user.type(input, 'New Name')

    expect(input.value).toBe('New Name')
  })

  it('should call onSubmit on submit', async () => {
    const user = userEvent.setup()

    render(<PlanForm plan={testPlan} onSubmit={handleSubmit} />)

    const input = screen.getByLabelText<HTMLInputElement>('Name')

    await user.clear(input)
    await user.type(input, 'New Name{enter}')

    expect(handleSubmit).toHaveBeenCalledWith({ ...testPlan, name: 'New Name' })
  })
})
