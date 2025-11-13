import React from 'react'
import { Badge, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { StarFill, Fire } from 'react-bootstrap-icons';

const BadgeItem = ({ type, value }) => {
  let Icon = null;
  let bg = 'secondary';
  let tooltip = '';

  switch (type) {
    case 'genre':
      bg = 'secondary';
      break;
    case 'releaseYear':
      tooltip = `Release Year: ${value}`;
      bg = 'primary';
      break;
    case 'adult':
      tooltip = value === 'R' ? 'Restricted' : 'General Audience';
      bg = value === 'R' ? 'danger' : 'success';
      break;
    case 'ratings':
      tooltip = `Ratings: ${value}/10`;
      bg = 'warning';
      Icon = StarFill;
      break;
    case 'popularity':
      tooltip = `Popularity: ${value}`;
      bg = 'danger';
      Icon = Fire;
      break;
    default:
      break;
  }

  const badgeContent = (
    <Badge
      bg={bg}
      className="genre-badge"
      style={{
        cursor: tooltip ? 'pointer' : 'default',
        marginRight: 8,
        display: 'inline-flex',
        alignItems: 'center',
        gap: 4
      }}
    >
      {Icon && <Icon style={{ verticalAlign: 'middle' }} />}
      {value}
    </Badge>
  );

  if (type === 'ratings' || type === 'popularity') {
    return (
      <OverlayTrigger placement="top" overlay={<Tooltip>{tooltip}</Tooltip>}>
        {badgeContent}
      </OverlayTrigger>
    );
  }

  return badgeContent;
};

export default BadgeItem;