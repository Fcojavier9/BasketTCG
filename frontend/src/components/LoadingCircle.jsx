import CircularProgress from "@mui/material/CircularProgress";
import "../styles/loadingCircle.css";

export const LoadingCircle = ({ sizeLoading }) => {
  return (
    <div className="loading">
      <svg width={0} height={0}>
        <defs>
          <linearGradient id="my_gradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#f35a0e" />
            <stop offset="100%" stopColor="#b90404" />
          </linearGradient>
        </defs>
      </svg>
      <CircularProgress
        sx={{ "svg circle": { stroke: "url(#my_gradient)" } }}
        size={sizeLoading}
      />
    </div>
  );
};
