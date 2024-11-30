<?php 

$hostname = "localhost"; 
$username = "root"; 
$password = ""; 
$database = "sensor_db"; 

$conn = mysqli_connect($hostname, $username, $password, $database);

if (!$conn) { 
    die("Connection failed: " . mysqli_connect_error()); 
}

echo "Database connection is OK<br>";

// Check if the 'sendval' (distance) value is not empty
if (!empty($_POST['sendval'])) {
    $distance = $_POST['sendval'];

    // Insert the new distance value
    $sql = "INSERT INTO sensor_data(distance) VALUES ($distance)"; 

    if ($conn->query($sql) === TRUE) {
        echo "Distance value inserted into the MySQL database table.<br>";

        // Cleanup logic: Check the total number of rows
        $countQuery = "SELECT COUNT(*) AS total FROM sensor_data";
        $countResult = $conn->query($countQuery);
        $rowCount = $countResult->fetch_assoc()['total'];

        // If row count exceeds 20, delete the oldest rows
        if ($rowCount > 20) {
            // Fetch the IDs of the rows to delete
            $excessRows = $rowCount - 20;
            $fetchIdsQuery = "
                SELECT id FROM sensor_data
                ORDER BY timestamp ASC
                LIMIT $excessRows
            ";
            $idResult = $conn->query($fetchIdsQuery);

            if ($idResult->num_rows > 0) {
                $idsToDelete = [];
                while ($row = $idResult->fetch_assoc()) {
                    $idsToDelete[] = $row['id'];
                }

                // Convert IDs to a comma-separated string
                $idsString = implode(',', $idsToDelete);

                // Delete the rows with the fetched IDs
                $deleteQuery = "DELETE FROM sensor_data WHERE id IN ($idsString)";
                if ($conn->query($deleteQuery) === TRUE) {
                    echo "$excessRows old rows deleted to maintain table size.<br>";
                } else {
                    echo "Error deleting old rows: " . $conn->error . "<br>";
                }
            }
        }
    } else {
        echo "Error: " . $sql . "<br>" . $conn->error;
    }
} else {
    echo "No distance value received.";
}

// Close MySQL connection
$conn->close();

?>