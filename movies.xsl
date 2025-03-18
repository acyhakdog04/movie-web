<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

    <xsl:template match="/">
        <html lang="en">
            <head>
                <meta charset="UTF-8"/>
                <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
                <title>Movie Database</title>
                <link rel="stylesheet" href="style.css"/>
            </head>
            <body>
                <div class="container">
                    <h2 class="title">Movie Lists</h2>

                    <table class="movie-table">
                        <thead>
                            <tr>
                                <th>Title</th>
                                <th>Director</th>
                                <th>Actors</th>
                                <th>Year</th>
                            </tr>
                        </thead>

                        <tbody>
                            <xsl:for-each select="movies/movie">
                                <tr>
                                    <td><xsl:value-of select="movieTitle" /></td>
                                    <td><xsl:value-of select="director" /></td>
                                    <td>
                                        <xsl:for-each select="actors/actor">
                                            <xsl:value-of select="." /> <br/>
                                        </xsl:for-each>
                                    </td>
                                    <td><xsl:value-of select="year" /></td>
                                </tr>
                            </xsl:for-each>
                        </tbody>
                    </table>
                </div>
            </body>
        </html>
    </xsl:template>
</xsl:stylesheet>