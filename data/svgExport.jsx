import * as React from "react"

export const heartSvg = (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    xmlnsXlink='http://www.w3.org/1999/xlink'
    viewBox='0 0 32 32'
    aria-hidden='true'
    role='presentation'
    focusable='false'
    style={{
      display: "block",
      fill: "rgba(0, 0, 0, 0.5)",
      height: 24,
      width: 24,
      stroke: "var(--linaria-theme_palette-icon-primary-inverse)",
      strokeWidth: 2,
      overflow: "visible"
    }}
    width={32}
    height={32}
  >
    <path
      d='M16 28c7-4.73 14-10 14-17a6.98 6.98 0 0 0-7-7c-1.8 0-3.58.68-4.95 2.05L16 8.1l-2.05-2.05a6.98 6.98 0 0 0-9.9 0A6.98 6.98 0 0 0 2 11c0 7 7 12.27 14 17z'
      stroke='#FFFFFF'
      fillOpacity={0.5}
      fill='#000000'
      strokeWidth='2px'
    />
  </svg>
)

export const logoSvg = (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width='30'
    height='32'
    viewBox='0 0 1007 1080'
    style={{ display: "block" }}
  >
    <path
      d='M949.278 666.715C875.957 506.859 795.615 344.664 713.713 184.809C698.893 155.177 670.813 98.2527 645.852 67.8412C609.971 24.1733 556.93 0.779785 503.109 0.779785C449.288 0.779785 396.247 24.1733 360.366 67.8412C335.406 98.2527 307.325 155.177 292.505 184.809C210.603 344.664 130.262 506.859 56.9404 666.715C47.5802 687.769 24.9598 737.675 16.3796 760.289C6.23941 787.581 0.779297 817.213 0.779297 846.845C0.779297 975.509 101.401 1079.22 235.564 1079.22C346.326 1079.22 434.468 1008.26 503.109 934.18C571.751 1008.26 659.892 1079.22 770.655 1079.22C904.817 1079.22 1006.22 975.509 1006.22 846.845C1006.22 817.213 999.979 787.581 989.839 760.289C981.259 737.675 958.638 687.769 949.278 666.715ZM503.109 810.195C447.728 738.455 396.247 649.56 396.247 577.819C396.247 506.079 446.948 470.209 503.109 470.209C559.27 470.209 610.751 508.419 610.751 577.819C610.751 647.22 558.49 738.455 503.109 810.195ZM770.655 998.902C688.628 998.902 618.271 941.557 555.955 872.656C620.205 792.541 691.093 679.121 691.093 577.819C691.093 458.513 598.271 389.892 503.109 389.892C407.947 389.892 315.906 458.513 315.906 577.819C315.906 679.098 386.294 792.478 450.318 872.593C387.995 941.526 317.614 998.902 235.564 998.902C146.642 998.902 81.1209 931.061 81.1209 846.845C81.1209 826.57 84.241 807.856 91.2611 788.361C98.2812 770.426 120.902 720.52 130.262 701.025C203.583 541.17 282.365 380.534 364.267 220.679C379.087 191.047 404.047 141.921 422.768 119.307C443.048 94.3538 471.129 81.0975 503.109 81.0975C535.09 81.0975 563.17 94.3538 583.451 119.307C602.171 141.921 627.132 191.047 641.952 220.679C723.854 380.534 802.635 541.17 875.957 701.025C885.317 720.52 907.937 770.426 914.957 788.361C921.978 807.856 925.878 826.57 925.878 846.845C925.878 931.061 859.576 998.902 770.655 998.902Z'
      fill='currentcolor'
    />
  </svg>
)

export const humburgerSvg = (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    viewBox='0 0 32 32'
    aria-hidden='true'
    role='presentation'
    focusable='false'
    style={{
      display: "block",
      fill: "none",
      height: "16px",
      width: "16px",
      stroke: "currentColor",
      strokeWidth: 3,
      overflow: "visible"
    }}
  >
    <g fill='none'>
      <path d='M2 16h28M2 24h28M2 8h28' />
    </g>
  </svg>
)

export const searchSvg = (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    viewBox='0 0 32 32'
    aria-hidden='true'
    role='presentation'
    focusable='false'
    style={{
      display: "block",
      fill: "none",
      height: "16px",
      width: "16px",
      stroke: "currentcolor",
      strokeWidth: "4",
      overflow: "visible"
    }}
  >
    <path fill='none' d='M13 24a11 11 0 1 0 0-22 11 11 0 0 0 0 22zm8-3 9 9' />
  </svg>
)

// export const doorSvg = (
//   <svg
//     xmlns='http://www.w3.org/2000/svg'
//     viewBox='0 0 32 32'
//     aria-hidden='true'
//     role='presentation'
//     focusable='false'
//     style={{
//       display: "block",
//       height: " 24px",
//       width: "24px",
//       fill: "currentcolor",
//       width: "32px",
//       height: "32px"
//     }}
//   >
//     <path
//       d='M24.33 1.67a2 2 0 0 1 2 1.85v24.81h3v2H2.67v-2h3V3.67a2 2 0 0 1 1.85-2h.15zm-4 2H7.67v24.66h12.66zm4 0h-2v24.66h2zm-7 11a1.33 1.33 0 1 1 0 2.66 1.33 1.33 0 0 1 0-2.66z'
//       fill='#222222'
//     ></path>
//   </svg>
// )

export const iconLibrary = {
  Key: (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 32 32'
      aria-hidden='true'
      role='presentation'
      focusable='false'
      style={{
        display: "block",
        height: " 24px",
        width: "24px",
        fill: "currentcolor",
        width: "32px",
        height: "32px"
      }}
    >
      <path
        d='M16.84 27.16v-3.4l-.26.09c-.98.32-2.03.51-3.11.55h-.7A11.34 11.34 0 0 1 1.72 13.36v-.59A11.34 11.34 0 0 1 12.77 1.72h.59c6.03.16 10.89 5.02 11.04 11.05V13.45a11.3 11.3 0 0 1-.9 4.04l-.13.3 7.91 7.9v5.6H25.7l-4.13-4.13zM10.31 7.22a3.1 3.1 0 1 1 0 6.19 3.1 3.1 0 0 1 0-6.2zm0 2.06a1.03 1.03 0 1 0 0 2.06 1.03 1.03 0 0 0 0-2.06zM22.43 25.1l4.12 4.13h2.67v-2.67l-8.37-8.37.37-.68.16-.3c.56-1.15.9-2.42.96-3.77v-.64a9.28 9.28 0 0 0-9-9h-.55a9.28 9.28 0 0 0-9 9v.54a9.28 9.28 0 0 0 13.3 8.1l.3-.16 1.52-.8v4.62z'
        fill='#222222'
      ></path>
    </svg>
  ),
  Location: (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 32 32'
      aria-hidden='true'
      role='presentation'
      focusable='false'
      style={{
        display: "block",
        height: " 24px",
        width: "24px",
        fill: "currentcolor",
        width: "32px",
        height: "32px"
      }}
    >
      <path
        d='M16 0a12 12 0 0 1 12 12c0 6.34-3.81 12.75-11.35 19.26l-.65.56-1.08-.93C7.67 24.5 4 18.22 4 12 4 5.42 9.4 0 16 0zm0 2C10.5 2 6 6.53 6 12c0 5.44 3.25 11.12 9.83 17.02l.17.15.58-.52C22.75 23 25.87 17.55 26 12.33V12A10 10 0 0 0 16 2zm0 5a5 5 0 1 1 0 10 5 5 0 0 1 0-10zm0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6z'
        fill='#222222'
      ></path>
    </svg>
  ),
  Calendar: (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 32 32'
      aria-hidden='true'
      role='presentation'
      focusable='false'
      style={{
        display: "block",
        height: " 24px",
        width: "24px",
        fill: "currentcolor",
        width: "32px",
        height: "32px"
      }}
    >
      <path
        d='M11.67 0v1.67h8.66V0h2v1.67h6a2 2 0 0 1 2 1.85v16.07a2 2 0 0 1-.46 1.28l-.12.13L21 29.75a2 2 0 0 1-1.24.58H6.67a5 5 0 0 1-5-4.78V3.67a2 2 0 0 1 1.85-2h6.15V0zm16.66 11.67H3.67v13.66a3 3 0 0 0 2.82 3h11.18v-5.66a5 5 0 0 1 4.78-5h5.88zm-.08 8h-5.58a3 3 0 0 0-3 2.82v5.76zm-18.58-16h-6v6h24.66v-6h-6v1.66h-2V3.67h-8.66v1.66h-2z'
        fill='#222222'
      ></path>
    </svg>
  )
}

export const AmenityIcon = ({ type }) => {
  const baseProps = {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 32 32",
    "aria-hidden": true,
    role: "presentation",
    focusable: false,
    style: {
      display: "block",
      width: "32px",
      height: "32px",
      fill: "currentColor"
    }
  }

  switch (type) {
    case "Wifi":
      return (
        <svg {...baseProps}>
          <path
            d='M16 20.33a3.67 3.67 0 1 1 0 7.34 3.67 3.67 0 0 1 0-7.34zm0 2a1.67 1.67 0 1 0 0 3.34 1.67 1.67 0 0 0 0-3.34zM16 15a9 9 0 0 1 8.04 4.96l-1.51 1.51a7 7 0 0 0-13.06 0l-1.51-1.51A9 9 0 0 1 16 15zm0-5.33c4.98 0 9.37 2.54 11.94 6.4l-1.45 1.44a12.33 12.33 0 0 0-20.98 0l-1.45-1.45A14.32 14.32 0 0 1 16 9.66zm0-5.34c6.45 0 12.18 3.1 15.76 7.9l-1.43 1.44a17.64 17.64 0 0 0-28.66 0L.24 12.24c3.58-4.8 9.3-7.9 15.76-7.9z'
            fill='#222222'
          ></path>
        </svg>
      )

    case "TV":
      return (
        <svg {...baseProps}>
          <path
            d='M9 29v-2h2v-2H6a5 5 0 0 1-5-4.78V8a5 5 0 0 1 4.78-5H26a5 5 0 0 1 5 4.78V20a5 5 0 0 1-4.78 5H21v2h2v2zm10-4h-6v2h6zm7-20H6a3 3 0 0 0-3 2.82V20a3 3 0 0 0 2.82 3H26a3 3 0 0 0 3-2.82V8a3 3 0 0 0-2.82-3z'
            fill='#222222'
          ></path>
        </svg>
      )

    case "Kitchen":
      return (
        <svg {...baseProps}>
          <path
            d='M11 1v7l1.9 20.82v.17a2.01 2.01 0 0 1-1.81 2 2 2 0 0 1-.18.01H2.92a2.01 2.01 0 0 1-1.82-2v-.09l1.9-21V1zm6 0h.15a2 2 0 0 1 1.84 1.84L19 3v7.12l-2 8V31h-2V17.96l.03-.16.03-.16L16.72 11H13V1zm11 0a2 2 0 0 1 2 1.85V29a2 2 0 0 1-1.85 2H21v-2h7v-2h-7v-2h7v-2h-7v-2h7v-2h-7v-2h7v-2h-7v-2h7v-2h-7V9h7V7h-7V5h7V3h-7V1zM9.09 9H4.9L3.1 29h7.81v-.06zM17 3h-2v6h2zM9 3H5v4h4z'
            fill='#222222'
          ></path>
        </svg>
      )

    case "AC":
      return (
        <svg {...baseProps}>
          <path
            d='M17 1v4.03l4.03-2.32 1 1.73L17 7.34v6.93l6-3.47V5h2v4.65l3.49-2.02 1 1.74L26 11.38l4.03 2.33-1 1.73-5.03-2.9L18 16l6 3.46 5.03-2.9 1 1.73L26 20.62l3.49 2.01-1 1.74L25 22.35V27h-2v-5.8l-6-3.47v6.93l5.03 2.9-1 1.73L17 26.97V31h-2v-4.03l-4.03 2.32-1-1.73 5.03-2.9v-6.93L9 21.2V27H7v-4.65l-3.49 2.02-1-1.74L6 20.62l-4.03-2.33 1-1.73L8 19.46 14 16l-6-3.46-5.03 2.9-1-1.73L6 11.38 2.51 9.37l1-1.74L7 9.65V5h2v5.8l6 3.47V7.34l-5.03-2.9 1-1.73L15 5.03V1z'
            fill='#222222'
          ></path>
        </svg>
      )
    case "Parking":
      return (
        <svg {...baseProps}>
          <path
            d='M26 19a1 1 0 1 1-2 0 1 1 0 0 1 2 0zM7 18a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm20.7-5 .41 1.12A4.97 4.97 0 0 1 30 18v9a2 2 0 0 1-2 2h-2a2 2 0 0 1-2-2v-2H8v2a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-9c0-1.57.75-2.96 1.89-3.88L4.3 13H2v-2h3v.15L6.82 6.3A2 2 0 0 1 8.69 5h14.62c.83 0 1.58.52 1.87 1.3L27 11.15V11h3v2h-2.3zM6 25H4v2h2v-2zm22 0h-2v2h2v-2zm0-2v-5a3 3 0 0 0-3-3H7a3 3 0 0 0-3 3v5h24zm-3-10h.56L23.3 7H8.69l-2.25 6H25zm-15 7h12v-2H10v2z'
            fill='#222222'
          ></path>
        </svg>
      )

    case "Pool":
      return (
        <svg {...baseProps}>
          <path
            d='M2 26.667c2-2.667 4 2.667 6 0s4 2.667 6 0 4 2.667 6 0 4 2.667 6 0'
            fill='none'
            stroke='currentColor'
            strokeWidth='2'
          />
          <path
            d='M10.667 5.333c0-2 2.666-2 2.666 0v18.667M18.667 5.333c0-2 2.666-2 2.666 0v18.667'
            stroke='currentColor'
            strokeWidth='2'
          />
        </svg>
      )

    case "Dryer":
      return (
        <svg {...baseProps}>
          <rect
            x='5.333'
            y='2.667'
            width='21.333'
            height='26.667'
            rx='2'
            stroke='currentColor'
            fill='none'
            strokeWidth='2'
          />
          <circle
            cx='16'
            cy='18.667'
            r='5.333'
            stroke='currentColor'
            strokeWidth='2'
            fill='none'
          />
          <line
            x1='16'
            y1='13.333'
            x2='16'
            y2='24'
            stroke='currentColor'
            strokeWidth='2'
          />
          <line
            x1='12.667'
            y1='18.667'
            x2='19.333'
            y2='18.667'
            stroke='currentColor'
            strokeWidth='2'
          />
        </svg>
      )

    case "Pets":
      return (
        <svg {...baseProps}>
          <path
            d='M13.7 13.93a4 4 0 0 1 5.28.6l.29.37 4.77 6.75a4 4 0 0 1 .6 3.34 4 4 0 0 1-4.5 2.91l-.4-.08-3.48-.93a1 1 0 0 0-.52 0l-3.47.93a4 4 0 0 1-2.94-.35l-.4-.25a4 4 0 0 1-1.2-5.2l.23-.37 4.77-6.75a4 4 0 0 1 .96-.97zm3.75 1.9a2 2 0 0 0-2.98.08l-.1.14-4.84 6.86a2 2 0 0 0 2.05 3.02l.17-.04 4-1.07a1 1 0 0 1 .5 0l3.97 1.06.15.04a2 2 0 0 0 2.13-2.97l-4.95-7.01zM27 12a4 4 0 1 1 0 8 4 4 0 0 1 0-8zM5 12a4 4 0 1 1 0 8 4 4 0 0 1 0-8zm22 2a2 2 0 1 0 0 4 2 2 0 0 0 0-4zM5 14a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm6-10a4 4 0 1 1 0 8 4 4 0 0 1 0-8zm10 0a4 4 0 1 1 0 8 4 4 0 0 1 0-8zM11 6a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm10 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4z'
            fill='#222222'
          ></path>
        </svg>
      )
    case "Hangers":
      return (
        <svg {...baseProps}>
          <path
            d='M16 2a5 5 0 0 1 1.66 9.72 1 1 0 0 0-.65.81l-.01.13v.81l13.23 9.05a3 3 0 0 1 1.3 2.28v.2a3 3 0 0 1-3 3H3.47a3 3 0 0 1-1.69-5.48L15 13.47v-.81a3 3 0 0 1 1.82-2.76l.17-.07a3 3 0 1 0-3.99-3V7h-2a5 5 0 0 1 5-5zm0 13.21L2.9 24.17A1 1 0 0 0 3.46 26h25.07a1 1 0 0 0 .57-1.82z'
            fill='#222222'
          ></path>
        </svg>
      )

    default:
      return (
        <svg {...baseProps}>
          <path
            fill='none'
            d='M13 24a11 11 0 1 0 0-22 11 11 0 0 0 0 22zm8-3 9 9'
            stroke='#FFFFFF'
            stroke-width='5.33333px'
          ></path>
        </svg>
      )
  }
}
