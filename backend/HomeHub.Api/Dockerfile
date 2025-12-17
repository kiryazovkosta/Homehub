FROM mcr.microsoft.com/dotnet/aspnet:10.0 AS base
WORKDIR /app
EXPOSE 8080
EXPOSE 8081

FROM mcr.microsoft.com/dotnet/sdk:10.0 AS build
ARG BUILD_CONFIGURATION=Release
WORKDIR /src
COPY ["backend/HomeHub.Api/HomeHub.Api.csproj", "backend/HomeHub.Api/"]
RUN dotnet restore "backend/HomeHub.Api/HomeHub.Api.csproj"
COPY . .
WORKDIR "/src/backend/HomeHub.Api"
RUN dotnet build "HomeHub.Api.csproj" -c $BUILD_CONFIGURATION -o /app/build

FROM build AS publish
ARG BUILD_CONFIGURATION=Release
RUN dotnet publish "HomeHub.Api.csproj" -c $BUILD_CONFIGURATION -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "HomeHub.Api.dll"]