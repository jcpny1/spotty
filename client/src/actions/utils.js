// Mark tracklist duplicates.
export function flagDuplicates(tracklist) {
  // Group tracks by track id.
  let groupedItems = _.groupBy(tracklist.items, function(item) { return item.track.id })
  // Look for duplicates and apply duplicate flag to duplicate items.
  for (const trackId in groupedItems) {
    if (trackId !== 'null' && groupedItems[trackId].length > 1) {
      _.forEach(groupedItems[trackId], function(item) { item.duplicate = true });
    }
  }
}

export function msToHMS(ms) {
  const seconds = Math.floor((ms/1000) % 60);
  const minutes = Math.floor((ms/(1000*60)) % 60);
  const hours   = Math.floor((ms/(1000*60*60)) % 24);
  return `${hours.toLocaleString('en-US', {minimumIntegerDigits:2})}:${minutes.toLocaleString('en-US', {minimumIntegerDigits:2})}:${seconds.toLocaleString('en-US', {minimumIntegerDigits:2})}`;
}

export function sortTrackList(data, sortColumnName) {
  let sortDirection = 'a';
  if ((data.sortColumnName === sortColumnName) && (data.sortDirection === 'a')) {
    sortDirection = 'd';
  }

  data.sortColumnName = sortColumnName;
  data.sortDirection  = sortDirection;

  const columnData1 = _.get(data.items[0], data.sortColumnName);

  if (sortColumnName === 'track.preview_url') {
    return sortTrackListNull(data);
  } else if (typeof columnData1 === 'string') {
    return sortTrackListString(data);
  } else {
    return sortTrackListNumber(data);
  }
}

// make specific, because columnName could be same, but table could be different. OR maybe store data in table instead of state.
// clean this up a bit.
function sortTrackListNull(data, sortColumnName) {
  data.items = data.items.sort(function (item1, item2) {
    const columnData1 = _.get(item1, data.sortColumnName);
    const columnData2 = _.get(item2, data.sortColumnName);

    if (data.sortDirection === 'a') {
      if (!columnData1) {
        return !columnData2 ? 0 : -1;
      } else {
        return columnData2 ? 0 : 1
      }
    } else {
      if (!columnData1) {
        return !columnData2 ? 0 : 1;
      } else {
        return columnData2 ? 0 : -1;
      }
    }
  });

  return;
}

// make specific, because columnName could be same, but table could be different. OR maybe store data in table instead of state.
// clean this up a bit.
function sortTrackListNumber(data, sortColumnName) {
  data.items = data.items.sort(function (item1, item2) {
    const columnData1 = _.get(item1, data.sortColumnName);
    const columnData2 = _.get(item2, data.sortColumnName);

    if (data.sortDirection === 'a') {
      if (!columnData1) {
        return !columnData2 ? 0 : -1;
      } else if (!columnData2) {
        return 1;
      } else {
        if (columnData1 < columnData2) {return -1;}
        if (columnData1 > columnData2) {return  1;}
        return 0;
      }
    } else {
      if (!columnData1) {
        return !columnData2 ? 0 : 1;
      } else if (!columnData2) {
        return -1;
      } else {
        if (columnData1 < columnData2) {return  1;}
        if (columnData1 > columnData2) {return -1;}
        return 0;
      }
    }
  });

  return;
}

// make specific, because columnName could be same, but table could be different. OR maybe store data in table instead of state.
// clean this up a bit.
function sortTrackListString(data) {
  data.items = data.items.sort(function (item1, item2) {
    const columnData1 = _.get(item1, data.sortColumnName);
    const columnData2 = _.get(item2, data.sortColumnName);

    if (data.sortDirection === 'a') {
      return columnData1.localeCompare(columnData2, 'en', { sensitivity: 'base', numeric: true, ignorePunctuation: true });
    } else {
      return columnData2.localeCompare(columnData1, 'en', { sensitivity: 'base', numeric: true, ignorePunctuation: true });
    }
  });

  return;
}
