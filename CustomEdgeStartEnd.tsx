import { BaseEdge, EdgeLabelRenderer, getBezierPath, type Edge, type EdgeProps } from "@xyflow/react";
import { type FC } from "react";

// this is a little helper component to render the actual edge label
function EdgeLabel({ transform, label }: { transform: string; label: string }) {
  return (
    <div
      style={{
        position: "absolute",
        background: "magenta",
        borderRadius: "60%",
        padding: 3,
        height: 8,
        minWidth: 8,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",

        color: "white",
        fontSize: 8,
        fontWeight: 700,
        transform,
      }}
      className="nodrag nopan"
    >
      {label}
    </div>
  );
}

const CustomEdge: FC<
  EdgeProps<
    Edge<{
      label: string;
      highlightedNode: string;
    }>
  >
> = ({ id, target, source, sourceX, sourceY, targetX, targetY, sourcePosition, targetPosition, data }) => {
  const [edgePath] = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });
  return (
    <>
      <BaseEdge id={id} path={edgePath} />
      <EdgeLabelRenderer>
        {source === data?.highlightedNode && <EdgeLabel transform={`translate(-75%, -75%) translate(${targetX}px,${targetY}px)`} label={data?.label || ""} />}
        {target === data?.highlightedNode && <EdgeLabel transform={`translate(-10%, -10%) translate(${sourceX}px,${sourceY}px)`} label={data?.label || ""} />}
        {data?.highlightedNode === "none" && (
          <EdgeLabel transform={`translate(-50%, -50%) translate(${(sourceX + targetX) / 2}px,${(sourceY + targetY) / 2}px)`} label={data?.label || ""} />
        )}
      </EdgeLabelRenderer>
    </>
  );
};

export default CustomEdge;
