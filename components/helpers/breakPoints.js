import useBreakpoints from 'use-breakpoints-width';

export default function breakPoints() {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { breakpoint, width } = useBreakpoints({
    breakpoints: {
      desktop: 1024,
      laptop: 768,
      mobile: 0,
    },
  });

  return breakpoint;
}
