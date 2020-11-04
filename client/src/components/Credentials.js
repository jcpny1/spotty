import React from 'react';
import {Image, Table} from 'semantic-ui-react';
import PropTypes from 'prop-types';

export const Credentials = (props) => {
  const {accessToken, profile_data} = props;

  function listCredentials(profile_data) {
    return (
      <Table.Body>
        <Table.Row>
          <Table.Cell width={3} >Profile Image</Table.Cell>
          <Table.Cell><Image src={profile_data.images[0].url} size='small' /></Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>Display Name</Table.Cell>
          <Table.Cell>{profile_data.display_name}</Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>Id</Table.Cell>
          <Table.Cell>{profile_data.id}</Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>Email</Table.Cell>
          <Table.Cell>{profile_data.email}</Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>Spotify URI</Table.Cell>
          <Table.Cell>{profile_data.external_urls.spotify}</Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>Link</Table.Cell>
          <Table.Cell>{profile_data.href}</Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>Country</Table.Cell>
          <Table.Cell>{profile_data.country}</Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>Access Token</Table.Cell>
          <Table.Cell>{accessToken}</Table.Cell>
        </Table.Row>
      </Table.Body>
    );
  }

  return (
    <div>
      <Table compact striped>
        {listCredentials(profile_data)}
      </Table>
    </div>
  );
}

Credentials.propTypes = {
  accessToken:  PropTypes.string.isRequired,
  profile_data: PropTypes.object.isRequired,
}
