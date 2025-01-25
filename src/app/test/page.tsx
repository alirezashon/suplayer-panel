import React from "react";

export interface ReferrerChartData {
  id: number;
  chpid: number; // Parent ID
  chtitle: string;
  chstatus: number; // Status level
  chlevel: number; // Level in hierarchy
}

// Sample Data
const testData: ReferrerChartData[] = [
  { id: 1, chpid: 0, chtitle: "مدیر فروش کل (شمال ایران)", chstatus: 1, chlevel: 1 },
  { id: 2, chpid: 1, chtitle: "مدیر برند 1", chstatus: 2, chlevel: 2 },
  { id: 3, chpid: 2, chtitle: "مدیر منطقه 1", chstatus: 3, chlevel: 3 },
  { id: 4, chpid: 3, chtitle: "سوپروایزر (تیم 1)", chstatus: 4, chlevel: 4 },
  { id: 5, chpid: 1, chtitle: "مدیر برند 2", chstatus: 2, chlevel: 2 },
  { id: 6, chpid: 5, chtitle: "مدیر منطقه 2", chstatus: 3, chlevel: 3 },
  { id: 7, chpid: 1, chtitle: "مدیر منطقه 4", chstatus: 3, chlevel: 3 },
];

// Recursive function to create tree structure
const buildTree = (data: ReferrerChartData[], parentId: number): ReferrerChartData[] => {
  return data
    .filter((item) => item.chpid === parentId)
    .map((node) => ({ ...node, children: buildTree(data, node.id) }));
};

// Render each node
const TreeNode: React.FC<{
  node: ReferrerChartData;
  x: number;
  y: number;
  parentX: number | null;
  parentY: number | null;
}> = ({ node, x, y, parentX, parentY }) => {
  const width = 200; // Width of each node
  const height = 60; // Height of each node
  const gapX = 250; // Horizontal gap between nodes
  const gapY = 100; // Vertical gap between levels

  return (
    <g>
      {/* Line from parent to current node */}
      {parentX !== null && parentY !== null && (
        <path
          d={`M${parentX},${parentY + height / 2} L${x},${y - height / 2}`}
          stroke="#ccc"
          fill="none"
          strokeWidth="2"
        />
      )}

      {/* Node */}
      <foreignObject x={x - width / 2} y={y - height / 2} width={width} height={height}>
        <div className="flex items-center justify-between bg-white border rounded-lg shadow p-2 h-full">
          <div>
            <div className="font-bold text-gray-700 text-sm">{node.chtitle}</div>
            <div className="text-xs text-gray-500">سطح {node.chstatus}</div>
          </div>
          <div className="flex space-x-2 space-x-reverse">
            <button className="text-purple-500">+</button>
            <button className="text-gray-400">✏️</button>
          </div>
        </div>
      </foreignObject>

      {/* Render children */}
      {node.children && (
        <>
          {node.children.map((child, index) => (
            <TreeNode
              key={child.id}
              node={child}
              x={x + (index - (node.children!.length - 1) / 2) * gapX}
              y={y + gapY}
              parentX={x}
              parentY={y}
            />
          ))}
        </>
      )}
    </g>
  );
};

const OrgChart: React.FC = () => {
  const tree = buildTree(testData, 0);

  return (
    <div className="flex justify-center items-center bg-gray-100 min-h-screen">
      <svg width="100%" height="100%" viewBox="0 0 1200 800">
        {tree.map((node, index) => (
          <TreeNode key={node.id} node={node} x={600} y={100} parentX={null} parentY={null} />
        ))}
      </svg>
    </div>
  );
};

export default OrgChart;
