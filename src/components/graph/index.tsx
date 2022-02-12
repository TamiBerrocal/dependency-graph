import { ArcherContainer, ArcherElement } from 'react-archer';
import './styles.css';
import { GraphProps } from './types';
import { getDependencyGraphLevels, validateInput } from './helpers';
import { STROKE_COLOR, STROKE_WIDTH } from './constants';
import { ERROR_MESSAGES } from './strings';
import { DATA_TESTID } from '../../data-testid';

export const Graph = ({ dependencies: input }: GraphProps) => {
  // Validate input
  const { dependencies, error } = validateInput(input);

  // In case of error, show informative message
  if (error) {
    return (
      <div className="Error" data-testid={DATA_TESTID.ERROR_BANNER}>
        {ERROR_MESSAGES.VALIDATION_ERROR(error.line, error.message)}
      </div>
    );
  }

  // Get dependency graph levels
  const levels = getDependencyGraphLevels(dependencies);
  const circularDependency = levels['circularDependency'];

  // In case of circular dependency, show informative message
  if (circularDependency) {
    return (
      <div className="Error" data-testid={DATA_TESTID.ERROR_BANNER}>
        {ERROR_MESSAGES.CIRCULAR_DEPENDENCY(circularDependency)}
      </div>
    );
  }

  return (
    <div className="GraphContainer" data-testid={DATA_TESTID.GRAPH}>
      <ArcherContainer
        strokeColor={STROKE_COLOR}
        lineStyle="straight"
        strokeWidth={STROKE_WIDTH}
      >
        {/* Loop levels to build graph rows */}
        {Object.keys(levels).map((level) => (
          <div className="Row" key={`level-${level}`}>
            {/* Create a node for each component in the level */}
            {levels[level].map((component) => (
              <ArcherElement
                key={component}
                id={component}
                // Component dependencies
                relations={
                  dependencies[component]
                    ? dependencies[component].map((dependency) => ({
                        targetId: dependency, // Id of the dependency
                        targetAnchor: 'top', // Place the end of the arrow on the top of the dependency node
                        sourceAnchor: 'bottom', // Place the start of the arrow on the bottom of the current node
                      }))
                    : []
                }
              >
                <div className="Component">{component}</div>
              </ArcherElement>
            ))}
          </div>
        ))}
      </ArcherContainer>
    </div>
  );
};
