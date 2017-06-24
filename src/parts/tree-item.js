import React, { Component } from 'react'
import PropTypes from 'prop-types'
import TreeItemTag from './tree-item-tag'
import TreeItemTagClose from './tree-item-tag-close'
import TreeItemChildren from './tree-item-children'

import styled from './tree-item-styled'

class TreeItem extends Component {
  render () {
    const { node, className, level } = this.props
    const hasChildren = node.children && node.children.length > 0

    return (
      <div className={className}>
        <TreeItemTag name={node.name} attrs={node.attrs} hasChildren={hasChildren} level={level} />
        <TreeItemChildren>
          {node.children.map((child, i) => (
            <StyledTreeItem key={i} node={child} level={level + 1} />
          ))}
          {hasChildren && <TreeItemTagClose name={node.name} level={level} />}
        </TreeItemChildren>
      </div>
    )
  }
}

const nodeProps = PropTypes.shape({
  name: PropTypes.string.isRequired,
  attrs: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    value: PropTypes.oneOfType([
      PropTypes.string.isRequired,
      PropTypes.number.isRequired,
      PropTypes.bool.isRequired
    ])
  })).isRequired,
  children: PropTypes.arrayOf(PropTypes.object)
})

TreeItem.propTypes = {
  node: nodeProps.isRequired,
  level: PropTypes.number
}
TreeItem.defaultProps = {
  level: 0
}
const StyledTreeItem = styled(TreeItem)

export default StyledTreeItem