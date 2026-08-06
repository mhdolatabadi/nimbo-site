import { useMemo } from 'react';
import { ARCH_EDGES, ARCH_NODES, ARCH_TEXT, ARCH_VIEWBOX } from '../content/architecture';

function stateFor(builtAt, week) {
  if (builtAt < week) return 'built';
  if (builtAt === week) return 'fresh';
  return 'future';
}

function Node({ node, state }) {
  const cx = node.x + node.w / 2;
  return (
    <g className={`arch-node ${state}`}>
      <rect x={node.x} y={node.y} width={node.w} height={node.h} rx="14" />
      <text x={cx} y={node.y + node.h / 2 - 3} textAnchor="middle" className="arch-label">
        {node.label}
      </text>
      <text x={cx} y={node.y + node.h / 2 + 19} textAnchor="middle" className="arch-sub">
        {node.sub}
      </text>
    </g>
  );
}

// Straight drop between two stacked blocks, with a small head so the direction reads.
function Edge({ from, to, state }) {
  const x = from.x + from.w / 2;
  const y1 = from.y + from.h;
  const y2 = to.y;
  return (
    <g className={`arch-edge ${state}`}>
      <line x1={x} y1={y1} x2={x} y2={y2 - 7} />
      <path d={`M${x - 5} ${y2 - 9} L${x} ${y2 - 1} L${x + 5} ${y2 - 9}`} />
    </g>
  );
}

export default function ArchitectureMap({ week }) {
  const byId = useMemo(() => Object.fromEntries(ARCH_NODES.map((n) => [n.id, n])), []);

  return (
    <div className="arch">
      <div className="arch-scroller">
        <svg
          className="arch-svg"
          viewBox={`0 0 ${ARCH_VIEWBOX.width} ${ARCH_VIEWBOX.height}`}
          role="img"
          aria-label={`${ARCH_TEXT.flowZone} — ${ARCH_TEXT.platformZone}`}
        >
          <line className="arch-divider" x1="618" y1="30" x2="618" y2="620" />
          <text className="arch-zone" x="870" y="24" textAnchor="start">
            {ARCH_TEXT.flowZone}
          </text>
          <text className="arch-zone" x="590" y="24" textAnchor="start">
            {ARCH_TEXT.platformZone}
          </text>

          {ARCH_EDGES.map((edge) => (
            <Edge key={`${edge.from}-${edge.to}`} from={byId[edge.from]} to={byId[edge.to]} state={stateFor(edge.week, week)} />
          ))}
          {ARCH_NODES.map((node) => (
            <Node key={node.id} node={node} state={stateFor(node.week, week)} />
          ))}
        </svg>
      </div>
      <div className="arch-legend">
        {Object.entries(ARCH_TEXT.legend).map(([state, label]) => (
          <span key={state} className={`arch-legend-item ${state}`}>
            <i aria-hidden="true" />
            {label}
          </span>
        ))}
      </div>
    </div>
  );
}
