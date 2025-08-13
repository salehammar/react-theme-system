import '@testing-library/jest-dom';

declare global {
  namespace jest {
    interface Matchers<R> {
      toHaveTextContent: (text: string | RegExp) => R;
      toHaveStyle: (style: Record<string, any>) => R;
      toBeInTheDocument: () => R;
      toHaveClass: (className: string) => R;
      toHaveAttribute: (attr: string, value?: string) => R;
    }
  }
}
