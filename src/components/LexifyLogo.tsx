import type { FC } from "react"

interface LexifyLogoProps {
  width?: number | string
  height?: number | string
  fill?: string
  className?: string
}

const LexifyLogo: FC<LexifyLogoProps> = ({
  width = 512,
  height = 512,
  fill = "currentColor",
  className = "",
  ...props
}) => (
  <svg
    id="fi_6365144"
    height={height}
    viewBox="0 0 100 100"
    width={width}
    xmlns="http://www.w3.org/2000/svg"
    fill={fill}
    className={className}
    {...props}
  >
    <path d="m25 40c-8.271 0-15-6.729-15-15s6.729-15 15-15 15 6.729 15 15-6.729 15-15 15zm0-23.333c-4.597 0-8.333 3.739-8.333 8.333s3.736 8.333 8.333 8.333 8.333-3.739 8.333-8.333-3.736-8.333-8.333-8.333z" />
    <path d="m75 90c-8.271 0-15-6.729-15-15s6.729-15 15-15 15 6.729 15 15-6.729 15-15 15zm0-23.333c-4.597 0-8.333 3.736-8.333 8.333s3.736 8.333 8.333 8.333 8.333-3.736 8.333-8.333-3.736-8.333-8.333-8.333z" />
    <path d="m31.667 90c-11.947 0-21.667-9.72-21.667-21.667 0-11.946 9.72-21.666 21.667-21.666h15v-15c0-11.947 9.72-21.667 21.666-21.667 11.947 0 21.667 9.72 21.667 21.667s-9.72 21.667-21.667 21.667h-15v15c0 11.946-9.72 21.666-21.666 21.666zm0-36.667c-8.271 0-15 6.729-15 15s6.729 15 15 15 15-6.729 15-15v-15zm21.666-6.666h15c8.271 0 15-6.729 15-15s-6.729-15-15-15-15 6.729-15 15z" />
  </svg>
)

export default LexifyLogo 
