# Вказуємо новіші образи з .NET 8
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
WORKDIR /app
EXPOSE 5000

FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src
COPY . .
RUN dotnet restore "SocialNetworkForGamers/SocialNetworkForGamers.csproj"
RUN dotnet publish "SocialNetworkForGamers/SocialNetworkForGamers.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=build /app/publish .
RUN mkdir -p /app/UploadedMedia

ENTRYPOINT ["dotnet", "SocialNetworkForGamers.dll"]

