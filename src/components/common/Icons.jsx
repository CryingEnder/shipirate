import React from "react";

function AngleLeft({ ...props }) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
      <path d="M17.921,1.505a1.5,1.5,0,0,1-.44,1.06L9.809,10.237a2.5,2.5,0,0,0,0,3.536l7.662,7.662a1.5,1.5,0,0,1-2.121,2.121L7.688,15.9a5.506,5.506,0,0,1,0-7.779L15.36.444a1.5,1.5,0,0,1,2.561,1.061Z" />
    </svg>
  );
}

function AngleRight({ ...props }) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
      <path d="M6.079,22.5a1.5,1.5,0,0,1,.44-1.06l7.672-7.672a2.5,2.5,0,0,0,0-3.536L6.529,2.565A1.5,1.5,0,0,1,8.65.444l7.662,7.661a5.506,5.506,0,0,1,0,7.779L8.64,23.556A1.5,1.5,0,0,1,6.079,22.5Z" />
    </svg>
  );
}

function ArrowLeft({ ...props }) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
      <path d="M10.88,17.715a1,1,0,0,0,0-1.415L7.588,13.007,18,13a1,1,0,0,0,0-2l-10.414.007L10.88,7.715A1,1,0,0,0,9.466,6.3L5.88,9.886a3,3,0,0,0,0,4.243l3.586,3.586A1,1,0,0,0,10.88,17.715Z" />
    </svg>
  );
}

function ArrowRight({ ...props }) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
      <path d="M13.121,6.293a1,1,0,0,0,0,1.414L16.413,11,6,11.007a1,1,0,1,0,0,2L16.414,13l-3.293,3.293a1,1,0,1,0,1.414,1.414l3.586-3.585a3,3,0,0,0,0-4.243L14.535,6.293A1,1,0,0,0,13.121,6.293Z" />
    </svg>
  );
}

function CheckBox({ ...props }) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
      <path d="M19,0H5A5.006,5.006,0,0,0,0,5V19a5.006,5.006,0,0,0,5,5H19a5.006,5.006,0,0,0,5-5V5A5.006,5.006,0,0,0,19,0Zm3,19a3,3,0,0,1-3,3H5a3,3,0,0,1-3-3V5A3,3,0,0,1,5,2H19a3,3,0,0,1,3,3Z" />
      <path d="M9.333,15.919,5.414,12A1,1,0,0,0,4,12H4a1,1,0,0,0,0,1.414l3.919,3.919a2,2,0,0,0,2.829,0L20,8.081a1,1,0,0,0,0-1.414h0a1,1,0,0,0-1.414,0Z" />
    </svg>
  );
}

function Check({ ...props }) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
      <path d="M7.8,21.425A2.542,2.542,0,0,1,6,20.679L.558,15.239a1.5,1.5,0,0,1,0-2.121h0a1.5,1.5,0,0,1,2.121,0L7.8,18.239,21.348,4.691a1.5,1.5,0,0,1,2.121,0h0a1.5,1.5,0,0,1,0,2.121L9.6,20.679A2.542,2.542,0,0,1,7.8,21.425Z" />
    </svg>
  );
}

function Cross({ ...props }) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
      <path d="M14.121,12l9.44-9.439A1.5,1.5,0,0,0,21.439.439L12,9.879,2.561.439A1.5,1.5,0,0,0,.439,2.561L9.879,12,.439,21.439a1.5,1.5,0,0,0,2.122,2.122L12,14.121l9.439,9.44a1.5,1.5,0,0,0,2.122-2.122Z" />
    </svg>
  );
}

function DoubleQuotes({ ...props }) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
      <path d="M8,4H4A4,4,0,0,0,0,8v4a2,2,0,0,0,2,2H7a5.006,5.006,0,0,1-5,5,1.5,1.5,0,0,0,0,3,8.009,8.009,0,0,0,8-8V6A2,2,0,0,0,8,4Z" />
      <path d="M22,4H18a4,4,0,0,0-4,4v4a2,2,0,0,0,2,2h5a5.006,5.006,0,0,1-5,5,1.5,1.5,0,0,0,0,3,8.009,8.009,0,0,0,8-8V6A2,2,0,0,0,22,4Z" />
    </svg>
  );
}

function MenuButton({ ...props }) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
      <path d="M1,6H23a1,1,0,0,0,0-2H1A1,1,0,0,0,1,6Z" />
      <path d="M23,9H1a1,1,0,0,0,0,2H23a1,1,0,0,0,0-2Z" />
      <path d="M23,19H1a1,1,0,0,0,0,2H23a1,1,0,0,0,0-2Z" />
      <path d="M23,14H1a1,1,0,0,0,0,2H23a1,1,0,0,0,0-2Z" />
    </svg>
  );
}

export {
  AngleLeft,
  AngleRight,
  ArrowLeft,
  ArrowRight,
  CheckBox,
  Check,
  Cross,
  DoubleQuotes,
  MenuButton,
};
