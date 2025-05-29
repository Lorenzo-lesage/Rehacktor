import Slide from "@mui/material/Slide";
import PropTypes from "prop-types";
import useHeaderVisible from "../../hooks/useHeaderVisible";

function HideOnScroll({ children, window }) {
  const visible = useHeaderVisible(window);

  return (
    <Slide appear={false} direction="down" in={visible}>
      {children ?? <div />}
    </Slide>
  );
}

HideOnScroll.propTypes = {
  children: PropTypes.element,
  window: PropTypes.func,
};

export default HideOnScroll;