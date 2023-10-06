# Pattern of the project

## Implementation

### 1. Structure

```bash
├── dist or build
├── src
│   ├── assets
│   │   ├── fonts
│   │   ├── images
│   │   ├── icons
│   ├── components
│   │   ├── headers
│   │   |  ├── DefaultHeader.tsx
│   │   |  ├── ...
│   │   |  ├── index.ts
│   │   ├── footers
|   |   |  ├── DefaultFooter.tsx
│   │   |  ├── ...
│   │   |  ├── index.ts
│   │   ├── buttons
|   |   |  ├── DefaultButton.tsx
│   │   |  ├── PrimaryButton.tsx
│   │   |  ├── ...
│   │   |  ├── index.ts
│   │   ├── ...
│   │   ├── index.ts
│   ├── layouts
│   │   ├── DefaultLayout.tsx
│   │   ├── ...
│   │   ├── index.ts
│   ├── pages
│   │   ├── Home.tsx
│   │   ├── about
│   │   |  ├── About.tsx
│   │   |  ├── about.module.css
│   │   |  ├── ...
│   │   ├── ...
│   │   ├── index.ts
│   ├── utils
│   │   ├── constants.ts
│   │   ├── ...
|   |   ├── index.ts
│   ├── services
│   │   ├── api.ts
│   │   ├── ...
|   |   ├── index.ts
|   ├── ...
│   ├── App.tsx
│   ├── react.tsx
├── index.html
├── node_modules
├── package.json
├── package-lock.json
└── .gitignore
```

### 2. Naming

- **File**: PascalCase (except for `index.ts`).
  Example:

```bash
Home.tsx // PascalCase
```

- **Folder**: lowercase. Example:

```bash
components // lowercase
```

- **Export**: PascalCase. Example:

```jsx
export const Home = () => {
  return <div>Home</div>;
}; // PascalCase
```

- **Export default**: PascalCase. Example:

```jsx
const Home = () => {
  return <div>Home</div>;
};

export default Home; // PascalCase
```

- **Export multiple**: PascalCase. Example:

```jsx
export { Home as HomePage } from "./Home"; // PascalCase
export { About as AboutPage } from "./about"; // PascalCase

// when import:
import { HomePage, AboutPage } from "~/pages"; // PascalCase
```

- **Import**: PascalCase. Example:

```jsx
import { Home } from "~/pages"; // PascalCase
import Home from "~/pages/Home"; // PascalCase
```

**Note**: If you want to import a file in the same folder, you can use `./` or `../` to import.

```jsx
import Home from "./Home"; // PascalCase
```

- **Import Image, Icon**: camelCase. Example:

```jsx
import logoHome from "~/assets/images/logo.png"; // camelCase
import iconCheck from "~/assets/icons/icon.svg"; // camelCase
```

- **Variable**: camelCase. Example:

```jsx
const isShow = true; // camelCase
```

- **Function**: camelCase. Example:
  Add prefix `handle` for function that handle event.

```jsx
// Arrow function:
const handleShow = () => {
  // camelCase
};
```

```jsx
// Normal function:
function handleShow() {
  // camelCase
}
```

### 3. Typescript

- **Type**: PascalCase. Example:

```jsx
type ButtonProps = {
  // PascalCase
  title: string,
};
```

- **Interface**: PascalCase. Example:

```jsx
interface ButtonProps {
  // PascalCase
  title: string;
}
```

- **Enum**: PascalCase. Example:

```jsx
enum ButtonType {
  // PascalCase
  Primary = "primary",
  Secondary = "secondary",
}
```

- **Generics**: PascalCase. Example:

```jsx
import { ButtonProps } from "~/components";

const Button = <T extends ButtonProps>(props: T) => {
  // PascalCase
  return <button>{props.title}</button>;
};
```

- **Return type**: PascalCase. Example:

```jsx
// Return type of a component is JSX.Element
const Button = (props: ButtonProps): JSX.Element => {
  // PascalCase
  return <button>{props.title}</button>;
};
```

```jsx
// Return type of function is void
const handleShow = (): void => {
  // camelCase
};

// Return type of function is number
const sum = (a: number, b: number): number => {
  // camelCase
  return a + b;
};

// Return type of function is string
const getFullName = (firstName: string, lastName: string): string => {
  // camelCase
  return `${firstName} ${lastName}`;
};

// Return type of function is boolean
const isShow = (a: number, b: number): boolean => {
  // camelCase
  return a > b;
};

// Return type of function is array
const getArray = (a: number, b: number): number[] => {
  // camelCase
  return [a, b];
};

// Return type of function is object
const getObject = (a: number, b: number): { a: number, b: number } => {
  // camelCase
  return { a, b };
};

// Return type of function is any
const getAny = (a: number, b: number): any => {
  // camelCase
  return a > b ? a : b;
};

// Return type of function is unknown
const getUnknown = (a: number, b: number): unknown => {
  // camelCase
  return a > b ? a : b;
};
```

### Comings soon
