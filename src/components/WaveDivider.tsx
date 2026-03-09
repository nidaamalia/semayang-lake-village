interface WaveDividerProps {
  color?: string;
  flip?: boolean;
  className?: string;
}

const WaveDivider = ({ color = 'hsl(var(--background))', flip = false, className = '' }: WaveDividerProps) => (
  <div className={`wave-divider ${flip ? 'rotate-180' : ''} ${className}`}>
    <svg viewBox="0 0 1200 60" preserveAspectRatio="none">
      <path
        d="M0,30 C200,60 400,0 600,30 C800,60 1000,0 1200,30 L1200,60 L0,60 Z"
        fill={color}
      />
    </svg>
  </div>
);

export default WaveDivider;
