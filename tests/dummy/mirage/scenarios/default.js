export default function(server) {
  server.loadFixtures('bars');
  server.loadFixtures('bazs');
  server.loadFixtures('foo-bars');
  server.loadFixtures('foo-emtpies');
  server.loadFixtures('foo-fixes');
  server.loadFixtures('foos');
  server.loadFixtures('multis');
  server.loadFixtures('bazs');
}
